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

const domain = process.env.DOMAIN

let keys = {
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
			require('openurl').open(this.authorizeUrl)

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
