const express = require('express')
const router = express.Router()

// Index route
router.get('/', (req, res, next) => {
	res.redirect('https://github.com/senti-platform/senti-api')
	console.log('API root call received!')
})

module.exports = router