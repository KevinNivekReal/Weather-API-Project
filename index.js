require('dotenv').config(); //to be able to access and add to the environment variables of the project
const api_key = process.env.API_KEY;
const express = require('express'); //for making the web server
const app = express();
app.use(express.static('public')); //sends the files in the public directory to client
const port = 3000;



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

//default webpage
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});


app.get('/weather/:lat/:lon', async (req,res) => {
  //latitude and longitude from location received from client
  const lat = req.params.lat;
  const lon = req.params.lon;

  //weather api call
  const api_url = 'http://api.weatherapi.com/v1/forecast.json?key=' + api_key + '&q=' + lat + ',' + lon + '&days=3';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();

  //send weather data back to client in json format
  res.json(json);
});

