const { google } = require('googleapis');
const { User } = require('../db/models');
const passport = require('passport');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK,
);

let userEmail;
let userID = passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id: id } });
  done(null, user);
});

const findUser = function ({ id, typeClient }) {
  if (typeClient === 'corporate') {
    return User.findOne({
      where: {
        email: process.env.CORPORATE_EMAIL,
      },
    }).then(function (user) {
      if (!user) {
        return 'User not find';
      }
      return user.dataValues;
    });
  } else {
    return User.findOne({
      where: {
        id: id,
      },
    }).then(function (user) {
      if (!user) {
        return 'User not find';
      }
      return user.dataValues;
    });
  }
};

async function getNewTokens(req, res, next) {
  const auth_code = req.query.code;
  if (auth_code) {
    await oAuth2Client.getToken(auth_code, async (err, token) => {
      if (err) {
        console.error('error while accessing token', err);
        return res.status(400).send('Error while accessing token..');
      }

      await oAuth2Client.setCredentials(token);

      let oauth2 = google.oauth2({
        auth: oAuth2Client,
        version: 'v2',
      });

      userEmail = (await oauth2.userinfo.get()).data.email;
      const user = await User.findOne({ where: { email: userEmail } });
      if (token.refresh_token) {
        await User.findOne({ where: { email: userEmail } }).then((user) => {
          if (user) {
            const updateUserDetails = {
              token: JSON.stringify({ refresh_token: token.refresh_token }),
            };
            user.update(updateUserDetails);
          }
        });
      }
      await passport.authenticate('google', { failureRedirect: '/login' });
      passport.serializeUser((user, done) => done(null, user.ID));

      await req.login(user, (err) => (err ? next(err) : res.redirect('/account')));
    });
  }
  return res, req;
}

async function getAuthClient() {
  let refreshToken;
  await findUser({ id: userID, typeClient: 'private' }).then((user) => {
    if (user && user.token.length > 0) {
      refreshToken = JSON.parse(user.token).refresh_token;
    }
    return;
  });
  await oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oAuth2Client;
}

async function getAuthCorporateClient() {
  let refreshToken;
  await findUser({ typeClient: 'corporate' }).then((user) => {
    if (user && user.token.length > 0) {
      const user_data_token = JSON.parse(user.token);
      refreshToken = user_data_token.refresh_token;
    }
    return;
  });
  await oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oAuth2Client;
}

google.options({ auth: oAuth2Client });

const people = () =>
  google.people({
    version: 'v1',
    auth: oAuth2Client,
  });

const calendar = () =>
  google.calendar({
    version: 'v3',
    auth: oAuth2Client,
  });

const gmail = () =>
  google.gmail({
    version: 'v1',
    auth: oAuth2Client,
  });

const corporateGmail = () =>
  google.gmail({
    version: 'v1',
    auth: oAuth2Client,
  });

getAuthClient()
  .then((client) => {
    gmail(client);
    corporateGmail(client);
    calendar(client);
    people(client);
  })
  .catch(console.error);

getAuthCorporateClient()
  .then((client) => {
    corporateGmail(client);
  })
  .catch(console.error);

module.exports = { oAuth2Client, people, calendar, gmail, corporateGmail, getNewTokens };
