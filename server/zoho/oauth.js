const { get, set, isNumber, isEmpty, takeRight, join, last } = require('lodash');
const Token = require('./token');
const { User } = require('../db/models');
const qs = require('qs');
const moment = require('moment');
const Axios = require('axios').default;

const Enum = {
  DC: {
    US: 'US',
    EU: 'EU',
    IN: 'IN',
    AU: 'AU',
    CN: 'CN',
  },

  AccessType: {
    Online: 'online',
    Offline: 'offline',
  },
};

/**
 * Manage Zoho Oauth storage and tokens
 */
class Oauth {
  constructor(options = {}) {
    this.userEmail = ''; //?

    this.clientID = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.redirectUri = process.env.ZOHO_REDIRECT_URL;
    this.scopes = process.env.ZOHO_SCOPES;
    this.response_type = 'code';
    this.axios = Axios;
    this._setUpAxios();
  }

  _setUpAxios() {
    this.axios.defaults.baseURL = process.env.ZOHO_BASE_URL;
  }

  /**
   *
   * @param {String} accessType
   * @param {boolean} promptUser
   * @param {String} state
   * @returns {String}
   */
  getAuthorizationUrl(accessType = Enum.AccessType.Offline, promptUser = false, state) {
    let url =
      process.env.ZOHO_BASE_URL +
      '/oauth/v2/auth' +
      '?' +
      `response_type=${encodeURIComponent(this.response_type)}&client_id=${encodeURIComponent(
        this.clientID,
      )}&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=${encodeURIComponent(this._getScopesAsString())}&access_type=${encodeURIComponent(
        accessType,
      )}`;
    if (promptUser) {
      url = url + '&prompt=consent';
    } else {
      url = url + '&prompt=none';
    }
    if (state) {
      url = url + `&state=${state}`;
    }
    return url;
  }

  _getAccessTokenUrl(code, state) {
    let url =
      process.env.ZOHO_BASE_URL +
      '/oauth/v2/token' +
      '?' +
      `code=${encodeURIComponent(code)}&client_id=${encodeURIComponent(
        this.clientID,
      )}&client_secret=${encodeURIComponent(this.clientSecret)}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `state=${encodeURIComponent(state)}&grant_type=authorization_code`;
    return url;
  }

  _getAccessTokenFromRefreshTokenUrl(refreshToken) {
    let url =
      process.env.ZOHO_BASE_URL +
      '/oauth/v2/token' +
      '?' +
      `refresh_token=${encodeURIComponent(refreshToken)}&client_id=${encodeURIComponent(
        this.clientID,
      )}&client_secret=${encodeURIComponent(this.clientSecret)}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(
        this._getScopesAsString(),
      )}&` +
      `grant_type=refresh_token`;
    return url;
  }

  _convertExpiresIn(tokenResponse) {
    let expiresIn = get(tokenResponse, 'expires_in');
    if (isNumber(expiresIn)) {
      expiresIn = expiresIn - 5;
      let expiresInDate = moment().add(expiresIn, 'second').toISOString();
      set(tokenResponse, 'expires_in', expiresInDate);
    }
  }

  /**
   * This method gives access token and refresh token from the auth code
   * @param {String} code
   * @param {String} state
   * @returns {JSON} token info
   */

  async getAccessTokenAndRefreshToken(code, state) {
    try {
      let url = this._getAccessTokenUrl(code, state);
      let tokenResponse = (await this.axios.post(url)).data;
      this._convertExpiresIn(tokenResponse);
      return tokenResponse;
    } catch (err) {
      console.log(`Error while generating token`, err);
      throw err;
    }
  }

  /**
   *
   * @param {String} refreshToken
   * @returns {JSON} token info
   */

  async getAccessTokenFromRefreshToken(refreshToken) {
    try {
      let url = this._getAccessTokenFromRefreshTokenUrl(refreshToken);
      let tokenResponse = (await this.axios.post(url)).data;
      this._convertExpiresIn(tokenResponse);
      return tokenResponse;
    } catch (err) {
      console.log(`Error while generating token`, err);
      throw err;
    }
  }

  /**
   *
   * @param {JSON} tokenInfo
   * @returns boolean isValid
   */

  // isTokenInfoValid(tokenInfo) {
  //   let accessToken = get(tokenInfo, 'access_token');
  //   if (isEmpty(accessToken)) return false;
  //   let expiresIn = get(tokenInfo, 'expires_in');
  //   if (isEmpty(expiresIn)) return false;
  //   return !moment().isAfter(expiresIn);
  // }

  // /**
  //  *
  //  * @param {JSON} tokenInfo
  //  * @returns {JSON}
  //  */

  // async getValidTokenInfo(tokenInfo) {
  //   let isValid = this.isTokenInfoValid(tokenInfo);
  //   if (isValid) {
  //     return { isValid: true, tokenInfo: tokenInfo };
  //   }
  //   tokenInfo = await this.getAccessTokenFromRefreshToken(tokenInfo.refresh_token);
  //   return { isValid: false, tokenInfo: tokenInfo };
  // }

  /**
   * Validate that the tokens file exists
   *
   * @returns {boolean}
   */
  async validToken(email) {
    try {
      await User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          const token = user.zoho_tokens;
          this.userEmail = user.email;
          if (token) {
            console.log('TOKENS WAS SAVED BEFORE');
            return true;
          } else {
            console.log('YOU NEED TO SAVE TOKENS');
            return false;
          }
        }
      });
    } catch (err) {
      return false;
    }
  }

  /**
   * Save the tokens file with the latest access token added to it
   *
   * @param {object} json New entry for the token responses
   */
  async saveTokens(json, email) {
    try {
      let data = this.getAllTokens(email);
      if (!data) {
        data = this._getDefaultStructure();
      } else {
        // Keep latest 9 records
        data.tokenResponses = takeRight(data.tokenResponses, 9);
      }

      data.issuedAt = Math.floor(Date.now() / 1000);

      // Update the refresh token if it's available in the response
      let refreshToken = get(json, 'refresh_token');
      if (refreshToken) {
        data.refreshToken = refreshToken;
      }

      // Add latest record
      data.tokenResponses.push(json);

      await User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          const zoho_tokens = JSON.parse(user.zoho_tokens);
          if (zoho_tokens && zoho_tokens.refreshToken && !data.refreshToken) {
            data.refreshToken = zoho_tokens.refreshToken;
          }
          const updateUserDetails = {
            zoho_tokens: JSON.stringify(data),
          };
          user.update(updateUserDetails);
        }
      });
    } catch (err) {
      console.log('Failed to save tokens to database: ' + err.message);
      throw err;
    }
  }

  /**
   * Get the default json structure for the tokens file
   *
   * @returns {object}
   */
  _getDefaultStructure() {
    return {
      refreshToken: '',
      tokenResponses: [],
    };
  }

  /**
   * Get the contents of the token file as an object
   *
   * @returns {object}
   * @throws
   */
  async getAllTokens(email) {
    let tokensObj;
    try {
      await User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          const tokens = JSON.parse(user.zoho_tokens);
          if (tokens) {
            tokensObj = tokens;
          } else {
            return false;
          }
        }
      });
      return tokensObj;
    } catch (err) {
      return null;
    }
  }

  /**
   * Get the latest token generated from the tokens file
   *
   * @returns {Token}
   */
  async getLatestToken(email) {
    let tokens = await this.getAllTokens(email);
    if (tokens && tokens.tokenResponses) {
      let token = new Token(last(tokens.tokenResponses));
      return token;
    }

    return false;
  }

  /**
   * Get the latest refresh token
   *
   * @returns {string}
   */
  async refreshToken(email) {
    let tokens = await this.getAllTokens(email);
    return get(tokens, 'refreshToken', '');
  }

  /**
   *
   * @returns {string}
   *
   */
  _getScopesAsString() {
    return join(JSON.parse(this.scopes));
  }

  getCodeFromRedirectedUrl(redirectedUrl) {
    if (redirectedUrl.indexOf('?') !== -1) {
      redirectedUrl = redirectedUrl.split('?')[1];
    }
    if (redirectedUrl.indexOf('code=') !== -1) {
      redirectedUrl = qs.parse(redirectedUrl).code;
    }
    return redirectedUrl;
  }
}

module.exports = Oauth;
