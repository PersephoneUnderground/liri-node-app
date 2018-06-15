// configuration
require("dotenv").config();

// will need fs to read and write files
var fs = require("fs");

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Take in the command line arguments
var nodeArgs = process.argv;

// sets up a variable for the user commands for simplicity (will always be third b/c node and liri are first two)
var userCommand = nodeArgs[2];
var userInputSpecific = nodeArgs[3];

// starts the program with a check for a command, otherwise greeting and prompt to enter a command if there is no third argument entered
if (userCommand) {

    // once we determine there is a command, then we run the if statement to see if it's one we have an answer for

    // =======================TWITTER========================== //
    if (userCommand === 'my-tweets') {
        // Building the twitter API call via the convenience code setup by the twitter node module
        // wrapped the API call in an if statement to let it only run with the right command
        client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
            if(error) throw error;
    
                //for loop here to loop through each tweet in array
                for (var i = 0; i < tweets.length; i++) {
                    console.log("\nTweet " + (i + 1)+ ": " + tweets[i].text);
                    console.log("Posted: " + tweets[i].created_at);    
                }
        });
    }
    // =======================END TWITTER========================== //

    // =======================SPOTIFY========================== //
    else if (userCommand === 'spotify-this-song') {
        // userInputSpecific in this case will be the string with the song title
        // limit of results set by default to 3 rather than the package's 20 default for simplicity since some searches will return multiple hits
        // Weird search results- not getting any accuracy matching the track names

        if (userInputSpecific) { // if input is truthy/not empty
            spotify.search({
                type: 'track',
                query: '"' + userInputSpecific + '"',
                limit: 1
                 }, 
                function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                // if no error, return data               
                // console.log(data);
                console.log("Name of Track: " + data.tracks.items[0].name);
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist name
                console.log("Album: " + data.tracks.items[0].album.name);// album name
                console.log(data.tracks.items[0]);// preview link- still constructing



                });
    
            
        } else {
            // if no song input, return default "The Sign" by Ace of Base
            console.log("The Sign by Ace of Base");
            
        }

        
    }
    // =======================END SPOTIFY========================== //

    // =======================IMDB========================== //
    else if (userCommand === 'movie-this') {

    }
    // =======================END IMDB========================== //

    // =======================READ COMMAND FROM RANDOM.TXT========================== //
    else if (userCommand === 'do-what-it-says') {

    }
    // =======================END READ COMMAND FROM RANDOM.TXT======================= //
    
    else {
        console.log("Sorry, that's not an option. Please pick from the following: \nmy-tweets' \nspotify-this-song '<song name here>'  ");
    }

} 

else {
    console.log("Welcome to Liri, your very limited personal assistant! \nPlease ask me a question: \nTo see your recent tweets, enter 'node liri.js my-tweets' \nTo find a song on Spotify, enter node liri.js spotify-this-song '<song name here>'");
}








    
