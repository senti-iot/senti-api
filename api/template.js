const express = require('express')
const router = express.Router()
const verifyAPIVersion = require('../lib/verifyapiversion')

/* get template */
router.get('/:version/', async (req, res, next) => {
	if (verifyAPIVersion(req.params.version)) {
		res.send(JSON.stringify('SentiAPI template'))
	} else {
		res.send(`API call to version ${req.params.version} not supported`)
	}
})

module.exports = router
