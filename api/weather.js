const dotenv = require('dotenv')
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('../lib/verifyapiversion')
const decrypt = require('../lib/encryption').decrypt

dotenv.load()

const { ENCRYPTION_KEY, WEATHER_API } = process.env

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
		console.log('API/weather returned:', response.status, Date())
		return response.data
	} else {
		console.log('API/weather Error:', response.problem)
		return null
	}
}

router.get('/:version/:date/:lat/:long/:lang', async (req, res, next) => {
	let apiVersion = req.params.version
	if (verifyAPIVersion(apiVersion)) {
		let response
		response = await getWeather(req.params.date, req.params.lat, req.params.long, req.params.lang, numRetry)
		res.json(response)
	} else {
		// Version error or test next version

		if (apiVersion === 'v2') {

			if (ENCRYPTION_KEY === decrypt(req.headers.auth)) {
				console.log('Validated ... ')
				res.json('Call validated ... Goodbye!')
			}
		}
		// res.send(`API/weather version: ${apiVersion} not supported`)
	}
})

module.exports = router
