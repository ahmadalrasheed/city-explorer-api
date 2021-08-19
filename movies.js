let axios=require('axios');
require('dotenv').config();

let CacheMemory={};

let AllMovies=async function (req,res){
  let AllMoviesSearch=req.query.movieSearch;
  if(CacheMemory[AllMoviesSearch]!==undefined){
    res.send(CacheMemory[AllMoviesSearch]);
    console.log('Element is in cache memory, its already saved!');
    // console.log(CacheMemory);
  }
  else{
    
    try{
      let movieData=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${AllMoviesSearch}`)
      console.log('Element is not in cache memory, Dont woryy it will be Added right Now!');
      
      let MoviesList=movieData.data.results
      let CityMovies=MoviesList.map(Movies=>{
        let AddMovieList = new MovieList(Movies.original_title,`Overview :${Movies.overview}`,`Average Votes :${Movies.vote_average}`,`Total Votes :${Movies.vote_count}`,Movies.poster_path,`Popularity :${Movies.popularity}`,`Release Date :${Movies.release_date}`)
        return AddMovieList
      })
      // console.log(CacheMemory);

      CacheMemory[AllMoviesSearch]=CityMovies;
      res.send(CityMovies);
    }
    catch(error){
      console.log(error);
      res.send('ERROR')
    }
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

module.exports=AllMovies