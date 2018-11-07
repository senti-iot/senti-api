const dotenv = require('dotenv').load()
const create = require('apisauce').create
const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('../lib/verifyapiversion')

const api = create({
	baseURL: `https://api.darksky.net/forecast/${process.env.WEATHER_API}/`,
	timeout: 30000
})

// DarkSky weather API proxy
const getWeather = async (date, lat, long, lang) => {
	let response
	try {
		response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`).then((rs) => rs, (rs) => rs)
	} catch (error) {
		console.error(error)
	}

	// check response	
	if (response.ok && response.status == 200) {
		console.log('API weather call returned', response.status)
		return response.data
	} else {
		console.log('API Error:', response.problem)
		return null
	}
}

/* get weather */
router.get('/:version/:date/:lat/:long/:lang', async (req, res, next) => {
	if (verifyAPIVersion(req.params.version)) {
		let response
		response = await getWeather(req.params.date, req.params.lat, req.params.long, req.params.lang)
		res.send(JSON.stringify(response))
	} else {
		res.send(`API call to version ${req.params.version} not supported`)
	}
})

router.get('/', (req, res, next) => {
	res.send('The weather looks great from here ... ')
	console.log('API /weather call received!')
})

module.exports = router
