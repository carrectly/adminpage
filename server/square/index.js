'use strict'
const router = require('express').Router()
var SquareConnect = require('square-connect')
var client = SquareConnect.ApiClient.instance

//const config = require('../../squareconfig.json').sandbox
// Configure OAuth2 access token for authorization: oauth2
// var oauth2 = client.authentications.oauth2
// client.basePath = 'https://connect.squareupsandbox.com'
// oauth2.accessToken = {
// 	squareApplicationId: 'sq0idb-1tqa9fkMqCkzgv_8RMhJ7w',
// 	squareAccessToken:
// 		'EAAAEPC4hWEeDK2uS1SQgwBVpFuMj47M4y4DjkhLfcBdAPhrBLAwjWTqrzE7Dbm-',
// 	squareLocationId: 'PRV2GHZVTGW0P',
// }

//this is similar to PG model. use variable api to list locations
//var api = new SquareConnect.LocationsApi()

// api.listLocations().then(
// 	function(data) {
// 		let keys = Object.keys(SquareConnect)
// 		keys.forEach(key => {
// 			console.log('square api keys', key)
// 		})

// 		console.log(
// 			'API called successfully. Returned data: ' +
// 				JSON.stringify(data, 0, 1)
// 		)
// 	},
// 	function(error) {
// 		console.error(error)
// 	}
// )

router.use('/customers', require('./customers'))
router.use('/invoices', require('./invoices'))

router.use((req, res, next) => {
	const err = new Error('API route not found!')
	err.status = 404
	next(err)
})

module.exports = router
