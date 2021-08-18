'use strict';

const express=require('express');

const cors = require('cors');

require('dotenv').config();


// let weather =require('./data/weather.json');

const server=express();

server.use(cors());

const PORT=process.env.PORT;

let WeatherForeCast=require('./weather');


let Allmovies =require('./movies');

// console.log('helloooo');

server.listen(PORT,()=>{
  console.log(`listening on PORT ${PORT}`);
});

server.get('/',(req,res)=>{
  res.send('welcome to my server!');
});

// getting info from Weather API 
// http://localhost:3001/weatherdata?city_name=Seattle

server.get('/weatherdata',WeatherForeCast);



// getting information from MOVIE API
// http://localhost:3001/movie?movieSearch=tokyo

server.get('/movie',Allmovies);


server.get('*',(req,res)=>{
  res.status(500).send('ERROR: NOT EXPECTED URL');
});
