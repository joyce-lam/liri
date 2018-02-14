//require("dotenv").config();


var request = require("request");
var nodeArg = process.argv;

var command = process.argv[2];

function omdb() {
	var movieName = "";

	if (process.argv[3]) {
		for (var i = 3; i < nodeArg.length; i++) {
			if (i > 3 && i < nodeArg.length) {
				movieName = movieName + "+" + nodeArg[i];
			} else {
				movieName += nodeArg[i];
			}
		}
	} else {
		movieName = "Mr. Nobody";
	}

	var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=520d49c3";

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




if (command === "movie-this") {
	omdb();
}




