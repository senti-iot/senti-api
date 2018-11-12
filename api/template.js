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
			res.json('SentiAPI template')
			console.log('API Access Authenticated!')
		} else {
			res.json('Unauthorized Access!')
			console.log('Unauthorized Access!')
		}
	} else {
		res.send(`API/template version: ${req.params.version} not supported`)
	}
})

module.exports = router
