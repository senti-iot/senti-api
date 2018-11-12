const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('senti-apicore').verifyapiversion
const { authenticate } = require('senti-apicore')

/* get template */
router.get('/:version/', async (req, res, next) => {
	let apiVersion = req.params.version
	let authToken = req.headers.auth
	if (verifyAPIVersion(apiVersion)) {
		if (authenticate(authToken)) {
			res.json('API/template Access Authenticated!')
			console.log('API/template Access Authenticated!')
		} else {
			res.json('Unauthorized Access!')
			console.log('Unauthorized Access!')
		}
	} else {
		res.send(`API/template version: ${apiVersion} not supported`)
	}
})

module.exports = router
