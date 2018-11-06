var dotenv = require('dotenv').load()
const express = require('express')
var helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()


app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.set('json')


// API routes
// TODO: Move to route files

app.get('/', (req, res, next) => {
	res.end('Senti.Cloud API ... There is absolutely nothing to see here ... ')
	console.log('API root call received!')
})


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
