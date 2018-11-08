# Senti.Cloud API

Senti.Cloud API (SentiAPI) allows you to build your own IoT Dashboards, Apps and Widgets. 

SentiAPI support access to your own Senti IoT device data or paid access to Senti Big Data based upon the crowd-sourced anonymised pool of Senti data.

SentiAPI also works as a consolidated proxy for other API endpoints that Senti and Senti.Cloud use for its services.

API version: 1.0

# Documentation

## API Version

Query the latest version of the different API's. This is ideal to call in your initial configuration or other API configuration. 

Always issue a call to this API before using a specific API if you want to use the latest version of the given API.

#### Endpoint
https://api.senti.cloud/apiversion/

#### Example
```js
// returns the current version of the weather API
https://api.senti.cloud/apiversion/weather
```

## Weather
The weather API is a proxy for the DarkSky weather API and is for internal use in Senti.Cloud. 


