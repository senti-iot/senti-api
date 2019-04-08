const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')

/* get template */
router.get('/:version/', async (req, res, next) => {
	let apiVersion = req.params.version
	let authToken = req.headers.auth
	// console.log(req, res)
	// res.send('API Test Works')
	if (verifyAPIVersion(apiVersion)) {
		if (authenticate(authToken)) {
			res.json('API/sigfox GET Access Authenticated!')
			// res.json({res, req})
			console.clear()
			console.log('API/sigfox GET Access Authenticated!')
		} else {
			res.status(403).json('Unauthorized Access! 403')
			// res.json('Unauthorized Access!')
			console.log('Unauthorized Access!')
		}
	} else {
		console.log(`API/sigfox version: ${apiVersion} not supported`)
		res.send(`API/sigfox version: ${apiVersion} not supported`)
	}
})

router.post('/:version', async (req,res, next)=> {
	let apiVersion = req.params.version
	let authToken = req.headers.auth
	console.log(req.body)
	// console.log(req, res)
	// res.send('API Test Works')
	if (verifyAPIVersion(apiVersion)) {
		if (authenticate(authToken)) {
			res.json('API/sigfox POST Access Authenticated!')
			// res.json({res, req})
			console.log('API/sigfox POST Access Authenticated!')
		} else {
			res.status(403).json('Unauthorized Access! 403')
			// res.json('Unauthorized Access!')
			console.log('Unauthorized Access!')
		}
	} else {
		console.log(`API/sigfox version: ${apiVersion} not supported`)
		res.send(`API/sigfox version: ${apiVersion} not supported`)
	}
})
module.exports = router
