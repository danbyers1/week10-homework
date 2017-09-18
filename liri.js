var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
 
var getMyTweets = function() {

 	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'danbyers1'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	 if (!error) {
   	 //console.log(tweets);
    	for(var i=0; i<tweets.length; i++) {
    		console.log(tweets[i].created_at);
    		console.log('__________________________________________');
    		console.log(tweets[i].text);
    	}
 	 	}
	});

}

var getArtistNames = function(artist) {
	return artist.name;
}


var getMySpotify = function(songName) {
 
	var spotify = new Spotify({
  		id: '1a27620116df42b790b8e7f08c1f0855',
  		secret: '55abfb20b49041f5b00a509ae45bb1fd',
	});
 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  	}
 		var songs = data.tracks.items;
 		 for(var i=0; 1<songs.length; i++) {
 		 	console.log(i);
 		 	console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
 		 	console.log('song name: ' + songs[i].name);
 		 	console.log('preview song: ' + songs[i].preview_url);
 		 	console.log('album: ' + songs[i].album.name);
 		 	console.log('__________________________________________');
 		 } 
	});

}

var getMyMovie = function(movieName) {


	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function (error, response, body) 	{
  		if(!error && response.statusCode == 200) {
   		 
   		 var jsonData = JSON.parse(body);
   		 console.log('__________________________________________');
   		 console.log('Title: ' + jsonData.Title);
   		 console.log('Year: ' + jsonData.Year); 
   		 console.log('Rated: ' + jsonData.Rated); 
   		 console.log('Country: ' + jsonData.Country); 
   		 console.log('Language: ' + jsonData.Language); 
   		 console.log('Plot: ' + jsonData.Plot); 
   		 console.log('Actors: ' + jsonData.Actors); 
   		 console.log('IMDB Rating: ' + jsonData.imdbRating); 
   		 console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating); 
   		 console.log('__________________________________________');
		}
	});
}

var doWhatItSays = function() {
	
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) throw err;
  		
  		var dataArr = data.split(',');

  		if(dataArr.length == 2) {
  			pick(dataArr[0], dataArr[1]);
  		} else if (dataArr.length == 1) {
  			pick(dataArr[0]);
  		}
 
  	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this':
			getMyMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
