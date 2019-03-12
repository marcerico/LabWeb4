const credentials = require('./credentials.js')
const request = require('request')

const mapBoxUrl = `https : // api.mapbox.com/geocoding/v5/mapbox.places/`
const darkSkyUrl = `https: //api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}`;

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Cual es tu ciudad? ', function(cityName) {
  getCoordinates(cityName)
  rl.close();
});

function getWeather(longitude,latitude){
  request({url : darkSkyUrl,json : true},function(error,response){
    const data={
    temperature:  body.currently.temperature,
    precip_probability: body.currently.precipProbability,
    summary:  body.currently.summary
    //response: `Hoy :  ${summary}. El clima se encuentra en :  ${temp} gradosC. Hay la probabilidad de que llueva de un ${precipProb}%`
  }
    console.log(data)
  })
}

function getCoordinates(cityName){
  request({url: mapBoxUrl,json: true},function(error,response){
    if(error){
      console.log(error,undefined)
    }
    else{
      const data={
      longitude : body.features[0].center[0],
      latitude : body.features[0].center[1]
    }
      getWeather(longitude,latitude)

    }
  })
}
