const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const requestIp = require('request-ip');
dotenv.config()

async function get_weather_report(web_url,params){
    const weather_report = await axios.get(web_url,{
        params
    })
    
    return weather_report.data
}
async function get_geolocation(web_url,params){
    try{
        const location = await axios.get(web_url,{
            params
        })
        // console.log(location)
        return await location.data
        
    }catch(error){
        console.log(error)
    }
}

module.exports = {get_geolocation,get_weather_report}

// const weatherAPIURL = 'http://api.weatherapi.com/v1/current.json'
// const geolocationAPIURL = 'https://api.geoapify.com/v1/ipinfo'
// let weatherAPIparams = {
//     key:process.env.WEATHER_API_KEY,
//     q:'127.0.0.1'
// }
// let geolocationAPIparams = {
//     apiKey:process.env.GEOLOCATION_API_KEY,
//     ip:'127.0.0.1'
// }

// async function main(){
//     // const weather_report = await get_weather_report(weatherAPIURL,weatherAPIparams)
// const geolocation_report = await get_geolocation(geolocationAPIURL,geolocationAPIparams)

// // console.log(weather_report.current.temp_c)
// console.log(geolocation_report)
// }
// main()
