# LIRI Bot
LIRI stands for Language Interpretation and Recognition Interface.

LIRI Bot is a command line node app that takes in parameters and outputs data. 

##Getting Started
###Prerequisities 
You need to sign up for keys for the following APIs in order to send requests:
* [Twitter API](https://developer.twitter.com/)
* [Spotify API](https://developer.spotify.com/web-api/)
* [Omdb API](http://www.omdbapi.com/)

In order to run this LIRI Bot, you also need to install the following Node packages to send requests to Twitter, Spotify and OMDB APIs.
* [Twitter](https://www.npmjs.com/package/twitter)
* [Spotify](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [DotEnv](https://www.npmjs.com/package/dotenv)


###Instructions
1. In terminal, go to your project and run `npm init -y` which can initialize a `package.json` file for your project. 

2. Make a Javascript file and put in 
```javascript
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
	key: process.env.OMDB_KEY
}
```

3. Then make a file named `.env`. You can then put your API keys in replace of the placeholders. This file will be used by `dotenv` package.
```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

#Omdb API keys

OMDB_KEY=your-consumer-key

```

4. Make a file called `liri.js`.
(1) Read and set any environment variables with the dotenv package with `require("dotenv").config();`.
(2) Import the keys.js file and store keys as variables.
  ```js
  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);
  ```
(3) Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`


(4)
 `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

 `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from
   
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   

`node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

`node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.



