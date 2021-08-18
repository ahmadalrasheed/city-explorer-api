let axios=require('axios');

require('dotenv').config();

let WeatherForeCast= async function (req,res){
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
  
  
  }

  
  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  module.exports= WeatherForeCast