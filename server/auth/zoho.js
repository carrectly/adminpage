const router = require('express').Router();
const { ZohoApi } = require('../zoho');
module.exports = router;

if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
  console.log('Zoho client ID / secret not found. Skipping Zoho OAuth.');
} else {
  const zohoApi = new ZohoApi();

  //Get OAuthURL
  router.get('/', (req, res, next) => {
    zohoApi.firstAuth(req, res, next);
  });

  //Get tokens from OAuthURL
  router.get('/callback', (req, res, next) => {
    zohoApi.getNewTokens(req, res, next);
  });

  router.get('/projects', (req, res) => {
    const email = req.user.dataValues.email;
    zohoApi
      .projects(email)
      .then((projects) => {
        // console.log('Projects: ' + JSON.stringify(projects.data));
      })
      .catch((err) => console.log(err));
  });

  router.get('/tasks', (req, res) => {
    const email = req.user.dataValues.email;
    zohoApi
      .tasks('1871715000000067463', email)
      .then((projects) => {
        // console.log('Projects: ' + JSON.stringify(projects.data));
      })
      .catch((err) => console.log(err));
  });
}
