const router = require('express').Router();
const { people } = require('./oAuth2Client');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let result = await listConnectionNames();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let newcontact = req.body;
    let result = await addNewContact(newcontact);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listConnectionNames() {
  const response = await people().connections.list({
    resourceName: 'people/me',
    pageSize: 2000,
    sortOrder: 'FIRST_NAME_ASCENDING',
    personFields: 'names,emailAddresses,phoneNumbers',
  });

  if (!response) {
    return console.log('The API returned an error: ');
  } else {
    return response.data.connections;
  }
}

async function addNewContact(obj) {
  const response = await people().createContact({
    requestBody: {
      emailAddresses: [{ value: obj.email }],
      phoneNumbers: [
        {
          value: obj.phoneNumber,
          type: 'mobile',
          formattedType: 'Mobile',
        },
      ],
      names: [
        {
          displayName: obj.firstName + ' ' + obj.lastName,
          familyName: obj.lastName,
          givenName: obj.firstName,
        },
      ],
    },
  });

  if (!response) {
    return console.log('The API returned an error: ');
  } else {
    return response.data;
  }
}
