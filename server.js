'use strict';

const express=require('express');

const cors = require('cors');

require('dotenv').config();


let weather =require('./data/weather.json');

const server=express();

server.use(cors());

const PORT=process.env.PORT;

// http://localhost:3001/weatherdata?city_name=Seattle
// console.log('helloooo');

server.listen(PORT,()=>{
  console.log(`listening on PORT ${PORT}`);
});

server.get('/',(req,res)=>{
  res.send('welcome to my server!');
});



server.get('/weatherdata',(req,res)=>{
  let city =req.query.city_name;
  //   let low =req.query.low_temp;
  //   let high=req.query.max_temp;
  // let description1=req.query.description;
  // let date=req.query.valid_date;
  try{
    console.log(city);
    let element=weather.find(item=>
      (item.city_name.toLowerCase() == req.query.city_name.toLowerCase())
    );
    let WeatherData = element.data.map(item => {
      let forecastDay = new Forecast(item.datetime, `Low of ${item.low_temp} , High of ${item.max_temp} with  ${item.weather.description}`);
      return forecastDay;
    });
    res.send(WeatherData);
  }
  catch(error){
    res.send('error');
  }


});

server.get('*',(req,res)=>{
  res.status(500).send('ERROR: NOT EXPECTED URL');
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
