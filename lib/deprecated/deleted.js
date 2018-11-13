// stuff deleted
// weather.js
response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`).then((rs) => rs, (rs) => rs)

response.headers.get('content-type').indexOf('javascript') === -1

console.log(req.headers['content-type'].indexOf('application/json') === -1)

// if (ENCRYPTION_KEY === decrypt(req.headers.auth)) {
// 	console.log('Validated ... ')
// 	res.json('Call validated ... Goodbye!')
// }

// Travis

// # script: "rsync -r --quiet $TRAVIS_BUILD_DIR/ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api"

// # after_deploy:
// # - "echo Deploying branch: $TRAVIS_BRANCH"
// #- "ssh deploy@organa.webhouse.net 'sudo npm install --prefix /srv/nodejs/senti/senti-api'"
// # - "ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/api-restart.sh $TRAVIS_BRANCH'"