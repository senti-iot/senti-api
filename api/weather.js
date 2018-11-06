var dotenv = require('dotenv').load()
const create = require('apisauce').create
var express = require('express')
var router = express.Router()

const weatherAPI = create({
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
	let result = await weatherAPI.get(`${lat},${long},${date}?lang=${lang}`).then((rs) => rs, rs => console.log(rs))
	// console.log(result.data)
	return result.data
}

/* GET weather */
router.get('/:date/:lat/:long/:lang', async (req, res, next) => {
	console.log(req.params.date, req.params.lat, req.params.long, req.params.lang)
	let result = await getWeather(req.params.date, req.params.lat, req.params.long, req.params.lang)
	// console.log(result)
	res.send(JSON.stringify(result))
})

router.get('/', (req, res, next) => {
	res.send('The weather looks great ... ')
	console.log('API weather call received!')
})

module.exports = router

// https://api.senti.cloud/weather/2018-05-11T00:00:00/57.0488/9.9217