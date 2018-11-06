#!/usr/bin/env nodejs
const dotenv = require('dotenv').load()
const express = require('express')
// const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

// API imports
const indexRouter = require('./api/index')
const weatherRouter = require('./api/weather')


app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors())
// app.set('json')


// API routes (endpoints)
// TODO: Move to route files

// Index route
// app.get('/', (req, res, next) => {
// 	res.end('Senti.Cloud API ... There is absolutely nothing to see here ... ')
// 	console.log('API root call received!')
// })

app.use('/', indexRouter)
app.use('/weather', weatherRouter)


//---Start the express server---------------------------------------------------

const port = process.env.SENTI_API_PORT || 3001

const startAPIServer = () => {
	app.listen(port, () => {
		console.log('Senti.Cloud API server started on ' + port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Server not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startAPIServer()
