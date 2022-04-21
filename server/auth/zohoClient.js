const Zoho = require('../zoho');

const zohoClient = new Zoho.Api({
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  tokenFile: __dirname + '/path/to/tokens.json', // Absolute path from current directory
  setup: true,
});

zohoClient
  .setup(process.env.ZOHO_CLIENT_ID)
  .then((response) => {
    console.log('Tokens file generated!', response);
  })
  .catch((err) => {
    console.log('Something failed!');
    console.log(err);
  });

// const api = new Zoho.Api({
//   clientId: '1000.XXXXXXXXXXXXXXXXXXXXXXXXX',
//   clientSecret: '011zzz.....................',
//   tokenFile: __dirname + '/files/tokens.json', // Absolute path from current directory
// });

zohoClient.api('GET', '/settings/modules').then((response) => {
  console.log('Got data!');
  console.log(response.data);
});

let query =
  'select Last_Name, Account_Name.Parent_Account, Account_Name.Parent_Account.Account_Name, First_Name, Full_Name, Created_Time from Contacts where Last_Name is not null limit 200';
zohoClient.coql(query).then((response) => {
  console.log('Got COQL results!');
  console.log(response.data);
});

//'https://accounts.zoho.com/oauth/v2/auth?scope=ZohoProjects.portals.READ,ZohoProjects.projects.ALL,ZohoProjects.tasks.READ&client_id=10*********8G&response_type=code&access_type=offline&redirect_uri=https://www.zylker.com/support&prompt=consent'
