var dotenv = require('dotenv').load()
const create = require('apisauce').create
var express = require('express')
var router = express.Router()

const api = create({
	baseURL: `https://api.darksky.net/forecast/${process.env.WEATHER_API}/`,
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Service': 'senti-weather-api'
	}
})

// proxy weather from Dark Sky API
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

/* GET weather */
router.get('/:date/:lat/:long/:lang', async (req, res, next) => {
	let result
	result = await getWeather(req.params.date, req.params.lat, req.params.long, req.params.lang)
	res.send(JSON.stringify(result))
})

router.get('/', (req, res, next) => {
	res.send('The weather looks great ... ')
	console.log('API weather call received!')
})

module.exports = router
