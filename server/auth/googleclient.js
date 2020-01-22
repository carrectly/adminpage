'use strict'
const {google} = require('googleapis')
const http = require('http')
const url = require('url')
const opn = require('open')
const destroyer = require('server-destroy')
const fs = require('fs')
const path = require('path')
const {User} = require('../db/models')
const PORT = process.env.PORT || 1337
const axios = require('axios')
const readline = require('readline')
const Window = require('window')
const domain = process.env.DOMAIN
const puppeteer = require('puppeteer')
var spawn = require('child_process').spawn
let command = 'open'
//	redirect_uris: [`${domain}oauth2callback`],
let keys = {
	//redirect_uris: ['https://carrectlyadmin.herokuapp.com/oauth2callback'],
	redirect_uris: [`${domain}oauth2callback`],
	client_id: process.env.client_id,
	client_secret: process.env.client_secret,
}

class SampleClient {
	constructor() {
		this.code = null
		this.oAuth2Client = new google.auth.OAuth2(
			'191684320612-pdpoh8nr6fnidb33gvvu4dggvv7k6ljv.apps.googleusercontent.com',
			'hnWtAeaC5bRITH4om9s8gfGX',
			keys.redirect_uris
		)
		this.setCode = this.setCode.bind(this)
		this.authenticate = this.authenticate.bind(this)
		this.authenticateToken = this.authenticateToken.bind(this)
	}

	setCode(str) {
		this.code = str
	}

	async authenticate(scopes) {
		console.log('here is the redirect', keys.redirect_uris)
		let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
		let tokenType = ''
		if (scopes[0].includes('calendar')) {
			tokenType = 'calendarToken'
		} else if (scopes[0].includes('gmail')) {
			tokenType = 'gmailToken'
		} else if (scopes[0].includes('contacts')) {
			tokenType = 'contactsToken'
		}
		if (usr.dataValues[tokenType]) {
			let tkn = JSON.parse(usr.dataValues[tokenType])
			this.oAuth2Client.credentials = tkn
			return this.oAuth2Client
		} else {
			this.authorizeUrl = await this.oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: scopes.join(' '),
			})

			console.log('We are about to open the URL')
			console.log('the URL', this.authorizeUrl)

			await spawn(command, [this.authorizeUrl])
			//open(this.authorizeUrl)
			// await axios.post('http://localhost:1337/auth/google/googleclient', {
			// 	url: this.authorizeUrl,
			// })

			// const pup = async () => {
			// 	const browser = await puppeteer.launch({
			// 		headless: false,
			// 	})
			// 	const page = await browser.newPage()
			// 	await page.setViewport({
			// 		width: 600,
			// 		height: 600,
			// 	})

			// 	await page.goto(this.authorizeUrl)
			// }

			// pup()
			// opn(this.authorizeUrl, {wait: false}).then(cp => cp.unref())
			// console.log('We tried to to open the URL')
			//require('openurl').open(this.authorizeUrl)

			return new Promise(async (resolve, reject) => {
				setTimeout(async () => {
					try {
						let tkn = await this.authenticateToken()
						tkn = JSON.stringify(tkn)
						await usr.update({[tokenType]: tkn})
						resolve(this.oAuth2Client)
					} catch (e) {
						reject(e)
					}
				}, 10000)
			})
		}
	}

	async authenticateToken() {
		const {tokens} = await this.oAuth2Client.getToken(this.code)
		this.oAuth2Client.credentials = tokens
		return tokens
	}
}

module.exports = new SampleClient()

// function open(urlStr, callback) {
// 	var child = spawn(command, [url])
// 	var errorText = ''
// 	child.stderr.setEncoding('utf8')
// 	child.stderr.on('data', function(data) {
// 		errorText += data
// 	})
// 	child.stderr.on('end', function() {
// 		if (errorText.length > 0) {
// 			var error = new Error(errorText)
// 			if (callback) {
// 				callback(error)
// 			} else {
// 				throw error
// 			}
// 		} else if (callback) {
// 			callback(error)
// 		}
// 	})
// }
