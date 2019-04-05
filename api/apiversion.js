const express = require('express')
const router = express.Router()


// LTS API versions
const apiVersions = {
	"index": "1",
	"weather": "1",
	"holidays": "1",
	"annual": "1",
	"template": "2",
}

/* GET template */
router.get('/:api', async (req, res, next) => {
	let api = req.params.api
	let response = apiVersions[api]
	res.json(response)
	console.log('API/apiversion returned', api, response)
	console.log(req)
})

module.exports = router
