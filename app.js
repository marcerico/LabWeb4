const credentials = require('./credentials.js')
const request = require('request')

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Cual es tu ciudad? ', function(cityName) {
  getCoordinates(cityName)
  rl.close();
});

const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${credentials.MAPBOX_TOKEN}`
const darkSkyUrl = `https: //api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}`;

function getCoordinates(cityName){
  request({url: mapBoxUrl , json: true},function(error,response){
      const data = response.body.features[0]
      getWeather(data.center[0],data.center[1])
  })
}


function getWeather(longitude,latitude){
  request({url : darkSkyUrl , json : true},function(error,response){
    const data = response.body.currently
    const weather ={
    day : data.summary,
    temperature:  data.temperature,
    precipitation_prob: data.precipProbability
    }
    const info = `Hoy ${weather.day}. El clima está a ${weather.temperature}°C. La probabilidad de que llueva es de ${weather.precipitation_prob}%`
    console.log(info)
  })
}

module.exports = {
  getCoordinates: getCoordinates,
  getWeather : getWeather
}
