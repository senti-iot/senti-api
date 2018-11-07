const express = require('express')
const router = express.Router()

const apiVersion = 1

const apiVersions = {
	"index": "1",
	"weather": "1",
	"template": "2",
}

/* GET template */
router.get('/:api', async (req, res, next) => {
	let api = req.params.api
	let response = apiVersions[api]
	res.send(response)
	console.log('API apiversion call returned', api, response)
})

module.exports = router
