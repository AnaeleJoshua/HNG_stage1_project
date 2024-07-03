const express = require('express')
const dotenv = require('dotenv')
const requestIp = require('request-ip');
// const axios = require('axios')
dotenv.config()
const {get_geolocation,get_weather_report} = require('./utility')

const app = express()
const port = process.env.PORT || 3000
const weatherAPIURL = 'http://api.weatherapi.com/v1/current.json'
const geolocationAPIURL = 'https://api.geoapify.com/v1/ipinfo'

app.use(requestIp.mw());

app.get('/api/hello',async(req,res)=>{
    // if (!req.query )
    const visitorName = !req.query || !req.query.visitor_name ? 'Mark': req.query.visitor_name
    const ip = req.clientIp;
    const visitor_ip_address = req.header['x-forwarded-for' || req.socket.remoteAddress] 
    // console.log(ip)
    // console.log(visitor_ip_address)
    //weather api params 
    let weatherAPIparams = {
        key:process.env.WEATHER_API_KEY,
        q:visitor_ip_address
        // q:'216.131.122.148'
    }
    //geolocation api params
    let geolocationAPIparams = {
        apiKey:process.env.GEOLOCATION_API_KEY,
        // ip:'216.131.122.148'
        ip:visitor_ip_address
    }
   
    try {
        const visitor_location = await get_geolocation(geolocationAPIURL, geolocationAPIparams);
        const visitor_location_weatherCondition = await get_weather_report(weatherAPIURL, weatherAPIparams);
        
        const cityName = visitor_location.city.name;
        const temperatureCelsius = visitor_location_weatherCondition.current.temp_c;
        
        // Respond with the visitor's city name and current temperature
        res.status(200).json({
            "client_ip":ip,
            "location":cityName,
            "greeting":`Hello, ${visitorName}!, the temperature is ${temperatureCelsius} in ${cityName}` 
             });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
    
})


app.listen(port,'0.0.0.0', () => {
    console.log(`app listening on port ${port}`)
  })