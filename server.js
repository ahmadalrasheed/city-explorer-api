'use strict';

const express=require('express');

const cors = require('cors');

let axios=require('axios');

require('dotenv').config();


// let weather =require('./data/weather.json');

const server=express();

server.use(cors());

const PORT=process.env.PORT;

// console.log('helloooo');

server.listen(PORT,()=>{
  console.log(`listening on PORT ${PORT}`);
});

server.get('/',(req,res)=>{
  res.send('welcome to my server!');
});




// getting info from Weather API 
// http://localhost:3001/weatherdata?city_name=Seattle

server.get('/weatherdata',async (req,res)=>{
  try{
  let city =req.query.city_name;
  let request =await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_KEY}`);
  let liveWeatherData=request.data;
  let counter=0;
    
    let WeatherData = liveWeatherData.data.map(item => {
      let forecastDay = new Forecast(item.datetime, `Low of ${item.low_temp} , High of ${item.max_temp} with  ${item.weather.description}`);
      counter=counter+1;
      return forecastDay;
    });
    let sliced=WeatherData.slice(0,6);
    res.send(sliced);
  }
  catch(error){
    res.send('error');
  }


});



// getting information from MOVIE API
// http://localhost:3001/movie?movieSearch=tokyo

server.get('/movie',async (req,res)=>{
  try{
    let movieSearch=req.query.movieSearch
    let movieData=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${movieSearch}`)
    
    let MoviesList=movieData.data.results
    let CityMovies=MoviesList.map(Movies=>{
      let AddMovieList = new MovieList(Movies.original_title,`Overview :${Movies.overview}`,`Average Votes :${Movies.vote_average}`,`Total Votes :${Movies.vote_count}`,Movies.poster_path,`Popularity :${Movies.popularity}`,`Release Date :${Movies.release_date}`)
      return AddMovieList
    })
    res.send(CityMovies);
  }
  catch(error){
    console.log(error);
    res.send('ERROR')
  }

})

server.get('*',(req,res)=>{
  res.status(500).send('ERROR: NOT EXPECTED URL');
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

class MovieList{
  constructor(title,overview,average_votes,total_votes,poster_path,popularity,released_on){
    this.title=title;
    this.overview=overview;
    this.average_votes=average_votes;
    this.total_votes=total_votes;
    this.image_url=`https://image.tmdb.org/t/p/w500${poster_path}`
    this.popularity=popularity;
    this.released_on=released_on;

  }
}