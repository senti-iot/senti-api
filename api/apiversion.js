const express = require('express')
const router = express.Router()

const apiVersion = 1

/* GET template */
router.get('/', async (req, res, next) => {
		res.send(JSON.stringify(apiVersion))
})

module.exports = router
