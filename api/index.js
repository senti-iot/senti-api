var express = require('express')
var router = express.Router()

// Index route
router.get('/', (req, res, next) => {
	res.redirect('https://github.com/senti-platform/senti-api')
	// res.end('Senti.Cloud API ... There is absolutely nothing to see here ... ')
	console.log('API root call received!')
})

module.exports = router