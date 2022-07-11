const axios = require('axios');
const { defaultsDeep, get } = require('lodash');
const qs = require('qs');
const Oauth = require('./oauth');

class ZohoApi {
  constructor(options) {
    this.options = defaultsDeep(options, this.defaultOptions());
    this.oauth = new Oauth();

    this.axios = axios.create({
      baseURL: this.opt('apiBaseUrl'),
      headers: this.opt('headers'),
    });
  }

  /**
   * Build the default options object
   *
   * @param {object} options
   * @returns {object}
   */
  defaultOptions(options) {
    let defaults = {
      apiBaseUrl: process.env.ZOHO_API_URL,
      oauthUrl: process.env.ZOHO_BASE_URL + '/oauth/v2/token',
      clientID: process.env.ZOHO_CLIENT_ID,
      clientSecret: process.env.ZOHO_CLIENT_SECRET,
      callbackURL: process.env.ZOHO_REDIRECT_URL,
      refreshToken: '',
      tokenFile: '',
      headers: {},
    };

    return defaults;
  }

  /**
   * Get an option from this.options
   *
   * @param {string} path Path where the option is stored (lodash paths)
   * @param {mixed} defaultValue Any default value
   * @returns {mixed}
   */
  opt(path, defaultValue = null) {
    return get(this.options, path, defaultValue);
  }

  /**
   * Check the oauth setup is correct, throw exception if it's not
   *
   * @throws
   */

  /**
   * First authorization and getting credentials from Zoho API
   *
   */
  checkToken(req, res, next) {
    //?
    if (this.oauth.validToken(req)) {
      let token = this.oauth.getLatestToken();
      if (!token) {
        console.error(
          'No tokens found in database [tokens column], generate new token with grand_token',
        );
      }
    } else {
      console.error(
        'No tokens available, generate auth link, authorize on Zoho and get new token with grand_token',
      );
    }
  }

  /**
   * Perform a request against the Zoho REST API
   *
   * @param {string} method
   * @param {string} path
   * @param {object} params
   * @param {object} config
   * @returns
   */
  async api(method, path, params, config) {
    if (get(config, 'auth', true) === true) {
      await this.auth(config.email);
    }

    let options = {
      method: method,
      url: path,
      data: params,
    };

    console.log('Current access token: ' + this.opt('accessToken'));
    if (this.opt('accessToken')) {
      options.headers = {
        Authorization: 'Zoho-oauthtoken ' + this.opt('accessToken'),
      };
    }

    return this.axios(options)
      .then((response) => {
        console.log('Got response!');
        console.log(response.data);

        if (response.data.error) {
          console.log(response);
          throw response;
        }

        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  /**
   * Get an access token from the tokens file, refresh it if necessary
   * and then set the access token for future requests.
   *
   * @returns {Promise}
   */
  async auth(email) {
    let token = await this.oauth.getLatestToken(email);
    let refresh_token = await this.oauth.refreshToken(email);
    return new Promise((resolve, reject) => {
      if (!token) {
        throw 'No tokens found in database [tokens column], generate new token with grand_token';
      } else if (token.expired()) {
        let params = {
          grant_type: 'refresh_token',
          client_id: this.opt('clientID'),
          client_secret: this.opt('clientSecret'),
          refresh_token: refresh_token,
        };

        let url = this.opt('oauthUrl') + '?' + qs.stringify(params);

        this.api('POST', url, {}, { auth: false })
          .then((response) => {
            this.oauth.saveTokens(response.data, email);
            this.options.accessToken = response.data.access_token;
            resolve();
          })
          .catch((error) => {
            console.log('Failed to refresh expired token');
            reject();
          });
      } else {
        console.log('auth successfull!');
        console.log(token);
        this.options.accessToken = token.accessToken();
        resolve();
      }
    });
  }

  async firstAuth(req, res) {
    const email = req.params.email;
    const validToken = await this.checkToken(email);
    if (!validToken) {
      const authUrl = this.oauth.getAuthorizationUrl('offline', true);
      res.redirect(authUrl);
    } else {
      res.redirect('/account');
    }
  }

  async getNewTokens(req, res) {
    const code = req.query.code;
    if (req.query.code == null) return res.status(400).send('Invalid Request');
    await this.oauth
      .getAccessTokenAndRefreshToken(code)
      .then(async (tokens) => {
        await this.oauth
          .saveTokens(tokens, req.user.email)
          .then(() => {
            console.log(`Tokens was saved successfully`, tokens);
            res.redirect('/account');
          })
          .catch((err) => {
            console.log(`Error saving tokens: ${err}`);
          });
      })
      .catch((error) => {
        console.log(`Error while generating token`, error);
      });
  }

  /* METHODS */

  // /**
  //  * EXAMPLE
  //  * Perform a COQL query and tasks against Zoho's API
  //  *
  //  * @param {string} query
  //  * @returns {Promise}
  //  */
  // async coql(query) {
  //   return await this.api('POST', '/coql', {
  //     select_query: query,
  //   });
  // }
  async tasks(project_id, email) {
    return await this.api('GET', `/portal/carrectly/projects/${project_id}/tasks/`, {}, { email });
  }

  async projects(email) {
    return await this.api('GET', '/portal/carrectly/projects/', {}, { email });
  }
}

module.exports = ZohoApi;
