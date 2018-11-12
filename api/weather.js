require('dotenv').load()
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')

const { WEATHER_API } = process.env
const weatherRoute = '/:version/:date/:lat/:long/:lang'

const api = create({
	baseURL: `https://api.darksky.net/forecast/${WEATHER_API}/`,
	timeout: 30000
})

const numRetry = 5

// DarkSky weather API proxy
const getWeather = async (date, lat, long, lang, n) => {
	let response
	try {
		response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`)
	} catch (error) {
		if (n === 1) {
			console.error(error)
		}
		response = await getWeather(date, lat, long, lang, n - 1)
	}
	// check response	
	if (response.ok && response.status == 200) {
		console.log('API/weather:', response.status, Date())
		return response.data
	} else {
		console.log('API/weather Error:', response.problem, Date())
		return 403
	}
}

router.get(weatherRoute, async (req, res) => {
	let apiVersion = req.params.version
	let authToken = req.headers.auth

	if (verifyAPIVersion(apiVersion)) {
		let response
		response = await getWeather(req.params.date, req.params.lat, req.params.long, req.params.lang, numRetry)
		res.json(response)
	} else {
		// Version error or test next version
		// res.send(`API/weather version: ${apiVersion} not supported`)
		console.log(`API version ${apiVersion} not yet supported`)

		if (apiVersion === 'v2') {
			// authToken ? console.log(authToken) : null
			if (authenticate(authToken)) {
				console.log('API Access Authenticated!')
				res.json('API Access Authenticated ... Goodbye!')
			}
		}
	}
})

module.exports = router
