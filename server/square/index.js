const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance

// Configure OAuth2 access token for authorization: oauth2
var oauth2 = client.authentications.oauth2
client.basePath = 'https://connect.squareupsandbox.com'
oauth2.accessToken =
	'EAAAEGLLxQtlJHKDn0cMnuM4Y9EhvXFlRm58tCCxw-4rM_S1ukgIExdyIpipkvuM'

var api = new SquareConnect.LocationsApi()

api.listLocations().then(
	function(data) {
		console.log(
			'API called successfully. Returned data: ' +
				JSON.stringify(data, 0, 1)
		)
	},
	function(error) {
		console.error(error)
	}
)
module.exports = router
