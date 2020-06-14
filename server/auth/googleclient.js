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

class SampleClient {
	constructor() {
		this.code = null
		this.oAuth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			process.env.GOOGLE_CALLBACK
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
			console.log(
				process.env.GOOGLE_CLIENT_ID,
				process.env.GOOGLE_CLIENT_SECRET,
				process.env.GOOGLE_CALLBACK
			)
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
			console.log('what is going on here - user found', usr)
			const {tokens} = await this.oAuth2Client.getToken(code)

			console.log('tokens received', tokens)
			this.oAuth2Client.credentials = tokens
			let tkn = JSON.stringify(tokens)
			let resp = await usr.update({token: tkn})

			console.log('updated user', resp)
			return tokens
		} catch (err) {
			console.error(err)
		}
	}
}

const googleClient = new SampleClient()

module.exports = googleClient
