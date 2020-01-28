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

//	redirect_uris: [`${domain}oauth2callback`],
let keys = {
	//redirect_uris: ['https://carrectlyadmin.herokuapp.com/oauth2callback'],
	redirect_uris: [`http://localhost:1337/oauth2callback`],
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
		this.authenticate = this.authenticate.bind(this)
		this.getCode = this.getCode.bind(this)
		this.authenticateToken = this.authenticateToken.bind(this)
	}

	async authenticate() {
		try {
			let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
			if (usr.dataValues.token) {
				let tkn = JSON.parse(usr.dataValues.token)
				this.oAuth2Client.credentials = tkn
				return this.oAuth2Client
			} else {
				return 'No token found!!!'
			}
		} catch (err) {
			console.error(err)
		}
	}

	async getCode(scopes) {
		try {
			this.authorizeUrl = await this.oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: scopes.join(' '),
			})
			return this.authorizeUrl
		} catch (err) {
			console.error(err)
		}
	}

	async authenticateToken(code) {
		try {
			let usr = await User.findOne({where: {email: 'info@carrectly.com'}})
			const {tokens} = await this.oAuth2Client.getToken(code)
			this.oAuth2Client.credentials = tokens
			let tkn = JSON.stringify(tokens)
			await usr.update({token: tkn})
			return tokens
		} catch (err) {
			console.error(err)
		}
	}
}

module.exports = new SampleClient()
