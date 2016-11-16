    // var authKey = "NjIxODAxMnwxNDc5MjY2ODQ0"

    // var searchEvent = "https://api.seatgeek.com/2/search?q=" + events + "&type=events";


    //Search
    function find(events){
      var queryURL = "http://eventful.com/events?q=" + events + "&type=music";
      $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
          console.log(response)


          
        });
}
      $('#selectEvent').on('click', function(){
        
        var eventSearch = $('#findEvent').val().trim();

        find(events);
         return false;

         });


        function getArtistTrack(artist){

        // Run an initial search to identify the artist unique Spotify ID
        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Prints the entire object to console
            console.log(response);

            // Prints the Artist ID from the Spotify Object to console.
            var artistID = response.artists.items[0].id;

            // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
            var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";

            // We then run a second AJAX call to get the tracks associated with that Spotify ID
            $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {

                // Gets the tracks
                console.log(trackResponse);

                // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
                var player = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[0].id+'" frameborder="0" allowtransparency="true"></iframe>';

                // Appends the new player into the HTML
               $("#playerDiv").append(player)
            })
        });     
    }


    // On Button Click for Artist Selection
    $('#selectArtist').on('click', function(){

        // Grab the Artist Name
        var artist = $('#artist-input').val().trim();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        getArtistTrack(artist);

        // Prevents moving to the next page
        return false;
    });

   

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }