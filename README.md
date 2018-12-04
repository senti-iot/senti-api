# Senti.API

Senti.Cloud API (Senti.API) allows you to build your own IoT Dashboards, Apps and Widgets. 

Senti.API support access to your Senti IoT device data or paid access to Senti Big Data based upon the crowd-sourced anonymised pool of Senti data.

Senti.API also works as a consolidated proxy for other API endpoints that Senti and Senti.Cloud use for its services.

API version: 1.0

# Documentation

## API Version

Query the latest version of the different API's. This is ideal to call in your initial configuration or other API configuration. API version can be queried without authentication. 

Always issue a call to this API before using a specific API if you want to use the latest version of the given API.

#### Endpoint
https://api.senti.cloud/apiversion/someapi

#### Example
```js
// returns the current version of the the following API's
https://api.senti.cloud/apiversion/weather
https://api.senti.cloud/apiversion/holidays
```

## Authentication
The API is authenticated through a bearer token in the call header. To obtain a token please contact apisupport@senti.cloud. 

```js
const api = create({
	baseURL: 'https://api.senti.cloud',
	timeout: 30000,
	headers: {
		'auth': 'Your Senti.API token'
	}
})
```

## Weather
The weather API is a proxy for the Dark Sky weather API. https://darksky.net/dev 

- https://api.senti.cloud/weather/v1/2018-05-11T00:00:00/57.0488/9.9217/da
- https://api.senti.cloud/weather/v1/2018-05-11T00:00:00/57.0488/9.9217/en

**API Route**
/:version/:date/:lat/:long/:lang

## Holidays

**Date format: YYYY-MM-DD**
- https://api.senti.cloud/holidays/v1/2018-01-01/2018-12-31/da
- https://api.senti.cloud/holidays/v1/2018-01-01/2018-12-31/en

**Language**
Holidays API support Danish holidays in Danish and English.

**API Route:**
/:version/:startdate/:enddate/:lang
