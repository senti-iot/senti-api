#!/usr/bin/env nodejs
const dotenv = require('dotenv').load()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// const bodyParser = require('body-parser')
const app = express()

// API imports
const indexRouter = require('./api/index')
const weatherRouter = require('./api/weather')


app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

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
