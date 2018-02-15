require("dotenv").config();

var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var nodeArg = process.argv;
var command = process.argv[2];
var name = "";


function commands() {
	if (command === "movie-this") {
		omdb();
	} else if (command === "my-tweets") {
		getTweets();
	} else if (command === "spotify-this-song") {
		spotifySong();
	} else if (command === "do-what-it-says") {
		doAsOrdered();
	}
}


commands();


function naming() {

	for (var i = 3; i < nodeArg.length; i++) {
		if (i > 3 && i < nodeArg.length) {
			name = name + "+" + nodeArg[i];
		} else {
			name += nodeArg[i];
		}
	}
}


function omdb(movieNames) {
	var movieKey = keys.omdb.key;
	naming();
	if (name) {
		name = name;
	} else {
		name = "Mr. Nobody";
	}

	var movieQueryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=" + movieKey;
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

			fs.appendFile("log.txt", command + "\n" + JSON.stringify(result) + "\n" + "----------------------------------" + "\n", function(err) {
				if (err) {
					console.log(err);
				} 
			})
		} else {
			console.log(error);
		}
	})
}


function getTweets() {

	naming();
	var params = {screen_name: name, count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if(!error) {
			console.log("\nTwitter screen_name:" + name);
			for (var i = 0; i < 20; i++) {
				console.log("\nTweets: " + tweets[i].text,
					"\nTweets created at: " + tweets[i].created_at);
				var tweetsNum = tweets + i;
				var result = {
					tweetsNum: tweets[i].text,
					tweetsNum_time: tweets[i].created_at
				};


				fs.appendFile("log.txt", command + "\n" + JSON.stringify(result) + "\n" + "----------------------------------" + "\n", function(err) {
					if (err) {
						console.log(err);
					}
		    	})
			}

		} else {
		console.log(error);
		}
	})
}


function spotifySong() {

	naming();

	spotify.search({type: "track", query: name}, function(error, data) {
		if(!error) {
			console.log("\nSong name: " + data.tracks.items[0].name,
				"\nArtist name: " + data.tracks.items[0].album.artists[0].name,
				"\nAlbum name: " + data.tracks.items[0].album.name,
				"\nPreview URL: " + data.tracks.items[0].preview_url);

			var result = {
				song_name: data.tracks.items[0].name,
				artist_name: data.tracks.items[0].album.artists[0].name,
				album_name: data.tracks.items[0].album.name,
				preview_url: data.tracks.items[0].preview_url
			};
			fs.appendFile("log.txt", command + "\n" + JSON.stringify(result) + "\n" + "----------------------------------" + "\n" , function(err) {
				if (err) {
					console.log(err);
				}
		    })
		} else {
			console.log(error);
		}
	})
}


function doAsOrdered() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error)
		} else {
			console.log(data);
			
			var dataArr = data.split(",");
			console.log(dataArr);
			command = dataArr[0].trim();
			console.log(command);
			name = dataArr[1].trim();
			console.log(name);
		}	
		commands();
	})

}


