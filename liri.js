require("dotenv").config();

var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var nodeArg = process.argv;
var command = process.argv[2];
var name = "";
var client = new twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if (process.argv[3]) {
	for (var i = 3; i < nodeArg.length; i++) {
		if (i > 3 && i < nodeArg.length) {
			name = name + "+" + nodeArg[i];
		} else {
			name += nodeArg[i];
		}
	}
} 

function omdb() {
	if (process.argv[3]) {
		name = name;
	} else {
		name = "Mr. Nobody";
	}

	var movieQueryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=520d49c3";
	
	request(movieQueryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("\nTitle: " + JSON.parse(body).Title);
			console.log("\nYear: " + JSON.parse(body).Year);
			console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
			//console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("\nCountry: " + JSON.parse(body).Country);
			console.log("\nLanguage: " + JSON.parse(body).Language);
			console.log("\nPlot: " + JSON.parse(body).Plot);
			console.log("\nActors: " + JSON.parse(body).Actors);
		}
	})
}


function getTweets() {
	var params = {screen_name: name, count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if(!error) {
			console.log("\nTwitter screen_name:" + name);
			for (var i = 0; i < 20; i++) {
				console.log("\nTweets: " + tweets[i].text);
				console.log("\nTweets created at: " + tweets[i].created_at);
			}
		} else {
			console.log(error);
		}
	})
}


function spotifySong() {
	spotify.search({type: "track", query: name}, function(error, data) {
		if(!error) {
			console.log(data.tracks);
			console.log(data.tracks.items[0].album.artists[0].name);
			console.log(data.tracks.items[0].album.name);
			console.log(data.tracks.items[0].preview_url);
		}
	})
}


if (command === "movie-this") {
	omdb();
} else if (command === "my-tweets") {
	getTweets();
} else if (command === "spotify-this-song") {
	spotifySong();
}




