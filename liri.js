require("dotenv").config();

var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");

var nodeArg = process.argv;
var command = process.argv[2];
var name = "";
var client = new twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


for (var i = 3; i < nodeArg.length; i++) {
	if (i > 3 && i < nodeArg.length) {
		name = name + "+" + nodeArg[i];
	} else {
		name += nodeArg[i];
	}
}


function omdb() {
	if (process.argv[3]) {
		name = name;
	} else {
		name = "Mr. Nobody";
	}

	console.log(name);
	var movieQueryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=520d49c3";
	request(movieQueryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("\nTitle: " + JSON.parse(body).Title, 
				"\nYear: " + JSON.parse(body).Year,
				"\nIMDB Rating: " + JSON.parse(body).imdbRating,
				"\nCountry: " + JSON.parse(body).Country, 
				"\nLanguage: " + JSON.parse(body).Language,
				"\nPlot: " + JSON.parse(body).Plot,
				"\nActors: " + JSON.parse(body).Actors);
				var result = {
				title: JSON.parse(body).Year,
				imdb_rating: JSON.parse(body).imdbRating,
				country: JSON.parse(body).Country,
				language: JSON.parse(body).Language,
				plot: JSON.parse(body).Plot,
				actors: JSON.parse(body).Actors
			};
			fs.appendFile("log.txt", command + JSON.stringify(result), function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Saved!")
				}
			})
		} else {
			console.log(error);
		}
	})
}


function getTweets() {
	var params = {screen_name: name, count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if(!error) {
			console.log("\nTwitter screen_name:" + name);
			for (var i = 0; i < 20; i++) {
				console.log("\nTweets: " + tweets[i].text,
					"\nTweets created at: " + tweets[i].created_at);
				}
			} else {
			console.log(error);
		}
	})
}


function spotifySong() {
	spotify.search({type: "track", query: name}, function(error, data) {
		if(!error) {
			console.log("\nArtist name: " + data.tracks.items[0].album.artists[0].name,
				"\nAlbum name: " + data.tracks.items[0].album.name,
				"\nPreview URL: " + data.tracks.items[0].preview_url);
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
