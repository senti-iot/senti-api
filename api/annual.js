require('dotenv').load()
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')
var moment = require('moment')

const annualRoute = '/:version/:startdate/:enddate/:lang'

const eachDay = (startDate, stopDate) => {
	var dates = []
	var currentDate = moment(startDate)
	var stopDate = moment(stopDate)
	while (currentDate <= stopDate) {
		dates.push(moment(currentDate).format('MM-DD'))
		currentDate = moment(currentDate).add(1, 'days')
	}
	return dates
}

const getByDate = (date, data, year) => {
	let filteredElements = data.filter((element) => {
		if (element.date === date) {
			element.date = `${year}-${element.date}`
			return element
		}
	})
	return filteredElements
}

/* 
Senti.API Annual Events API
Date format: YYYY-MM-DD
https://api.senti.cloud/annual/v1/2018-01-01/2018-12-31/da
https://api.senti.cloud/annual/v1/2018-01-01/2018-12-31/en
/:version/:startdate/:enddate/:lang
 */
const getAnnualEvents = async (startDate, endDate, lang) => {
	let year = startDate.substring(0, 4)
	const days = lang === 'en' ? require('../lib/days.en.json') : require('../lib/days.da.json')
	let dates = eachDay(startDate, endDate)
	let destinationArray = []
	for (let i in dates) {
		destinationArray.push(...getByDate(dates[i], days, year))
	}
	console.log('API/annual:', '200', Date())
	return JSON.stringify(destinationArray)
}

router.get(annualRoute, async (req, res) => {
	let apiVersion = req.params.version
	let authToken = req.headers.auth

	if (verifyAPIVersion(apiVersion)) {
		if (authToken) {
			if (authenticate(authToken)) {
				let response
				response = await getAnnualEvents(req.params.startdate, req.params.enddate, req.params.lang)
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
