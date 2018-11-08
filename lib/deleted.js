// stuff deleted
// weather.js
response = await api.get(`${lat},${long},${date}?lang=${lang}&exclude=alerts,flags&units=si`).then((rs) => rs, (rs) => rs)

