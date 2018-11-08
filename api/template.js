const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('../lib/verifyapiversion')

/* get template */
router.get('/:version/', async (req, res, next) => {
	if (verifyAPIVersion(req.params.version)) {
		res.json('SentiAPI template')
	} else {
		res.send(`API/template version: ${req.params.version} not supported`)
	}
})

module.exports = router
