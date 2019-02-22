require('dotenv').load()
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')
const { createInstance } = require('@salling-group/auth')

const { HOLIDAYS_TOKEN } = process.env
const holidaysRoute = '/:version/:startdate/:enddate/:lang'

const numRetry = 2

const instance = createInstance({
	'applicationName': 'Senti.API',
	'auth': {
		'type': 'bearer',
		'token': HOLIDAYS_TOKEN,
	},
})

/* 

Salling Group holidays API proxy
Date format: YYYY-MM-DD
https://api.senti.cloud/holidays/v1/2018-01-01/2018-12-31/da
https://api.senti.cloud/holidays/v1/2018-01-01/2018-12-31/en
/:version/:startdate/:enddate/:lang

 */
const getHolidays = async (startDate, endDate, lang, n) => {
	let response, language
	lang === 'en' ? language = 'en-US' : language = 'da-DK'
	try {
		response = await instance.get(`/v1/holidays?translation=${language}`, {
			'params': {
				'startDate': startDate,
				'endDate': endDate,
			},
		})
	} catch (error) {
		if (n === 1) {
			console.error(error)
		}
		response = await getHolidays(startDate, endDate, lang, n - 1)
	}
	// check response	
	if (response.status == 200) {
		console.log('API/holidays:', response.status, Date())
		return response.data
	} else {
		console.log('API/holidays Error:', response.status, Date())
		return 403
	}
}

router.get(holidaysRoute, async (req, res) => {
	let apiVersion = req.params.version
	let authToken = req.headers.auth

	if (verifyAPIVersion(apiVersion)) {
		if (authToken) {
			if (authenticate(authToken)) {
				let response
				response = await getHolidays(req.params.startdate, req.params.enddate, req.params.lang, numRetry)
				res.json(response)
				console.log('API Access Authenticated!')
			} else {
				res.json(403)
				console.log('API Unauthorized Access!')
			}
		} else {
			res.json(403)
			console.log('API Unauthorized Access! Missing token')
		}
	} else {
		// Version error or test next version
		// res.send(`API/holidays version: ${apiVersion} not supported`)
		console.log(`API version ${apiVersion} not yet supported`)

		if (apiVersion === 'v2') {
			if (authenticate(authToken)) {
				console.log('API test Access Authenticated!')
				res.json('API test Access Authenticated ... Goodbye!')
			}
		}
	}
})

module.exports = router
