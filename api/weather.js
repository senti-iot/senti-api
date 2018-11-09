const dotenv = require('dotenv')
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('../lib/verifyapiversion')

dotenv.load()

const api = create({
	baseURL: `https://api.darksky.net/forecast/${process.env.WEATHER_API}/`,
	timeout: 30000
})

const numRetry = 5

// DarkSky weather API proxy
const getWeatherRetry = async (date, lat, long, lang, n) => {
	let response
	try {
		response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`)
	} catch (error) {
		if (n === 1) {
			console.error(error)
		}
		response = await getWeatherRetry(date, lat, long, lang, n - 1)
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

/* get weather */
router.get('/:version/:date/:lat/:long/:lang', async (req, res, next) => {
	if (verifyAPIVersion(req.params.version)) {
		let response
		response = await getWeatherRetry(req.params.date, req.params.lat, req.params.long, req.params.lang, numRetry)
		res.json(response)
	} else {
		res.send(`API/weather version: ${req.params.version} not supported`)
	}
})

module.exports = router