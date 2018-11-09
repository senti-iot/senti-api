// stuff deleted
// weather.js
response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`).then((rs) => rs, (rs) => rs)

response.headers.get('content-type').indexOf('javascript') === -1

console.log(req.headers['content-type'].indexOf('application/json') === -1)

// if (ENCRYPTION_KEY === decrypt(req.headers.auth)) {
// 	console.log('Validated ... ')
// 	res.json('Call validated ... Goodbye!')
// }
