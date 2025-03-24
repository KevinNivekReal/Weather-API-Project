require('dotenv').config();
const api_key = process.env.API_KEY;
const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/weather/:lat/:lon', async (req,res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const api_url = 'http://api.weatherapi.com/v1/forecast.json?key=' + api_key + '&q=' + lat + ',' + lon + '&days=3';
  console.log(api_url);
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();

  console.log(json);
  res.json(json);
});

