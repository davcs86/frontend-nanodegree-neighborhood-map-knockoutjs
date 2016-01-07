/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "", "varsIgnorePattern": "LocationsFactory" }]*/
/*global google,OAuth,_*/
var LocationsFactory = {
    /**
     * Search for places based on the center and the boundaries of the map,
     * in the Google Places API.
     * Returns a promise, which is resolved when the API call returns a response.
     * @param {object} map - Map returned from ngMap
     * @param {object} bounds - Bounds of the map
     */
    getGoogleNearbyPlaces: function(map, bounds, callbackSuccess, callbackError) {
        var request = {
                location: map.getCenter(),
                bounds: bounds,
                types: ['restaurant'] // search for food places
            },
            service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if(_.isFunction(callbackSuccess)) {
                    callbackSuccess(results);
                }
            } else {
                if(_.isFunction(callbackError)) {
                    callbackError();
                }
            }
        });
    },
    /**
     * Search for a yelp business that matches with the google place result.
     * @param {string} placeId - Google Places API identifier
     * @param {string} placeName - Name of the location
     * @param {string} placeLocLat - Latitude of the location
     * @param {string} placeLocLng - Longitude of the location
     * @param {string} placeLocation - City where the location is
     * @param {function} callbackSuccess - Callback to be executed when the request was succesful
     * @param {function} callbackError - Callback to be executed when the request failed
     */
    searchYelpBusiness: function(placeId, placeName, placeLocLat, placeLocLng, placeLocation, callbackSuccess, callbackError) {
        var c = (new Date()).getTime(), // milliseconds  to name the custom callback
            oauth = OAuth({             // OAuth object with the yelp keys
                consumer: {
                    public: '-0OmC9HI7oxDSZtNxu8sCQ',
                    secret: 'mk6UB3_5uLISj3-9sL_982lOl9M'
                },
                signature_method: 'HMAC-SHA1'
            }),
            callbackName = 'yelp_callback_'+(c+placeId+'').replace(/[^0-9A-Za-z_]/g,'_'), // a valid jsonp callback name
            request = {                 // parameters of the request
                url: 'http://api.yelp.com/v2/search',
                method: 'GET',
                data: {
                    limit: 1,
                    term: placeName,
                    cll:  placeLocLat+','+placeLocLng,
                    location: placeLocation,
                    callback: callbackName
                }
            },
            oauthToken = {              // yelp token
                public: 'v3TxAKHJ7jxke9vbVI-CjBnOfVP2f3DZ',
                secret: 'JWuqPhtTUFsc3k1H0cN5LREpBtA'
            }
        // Create a timeout of 10 seconds to destroy the callback function
        // and execute the callbackError
        var timeout = setTimeout(function(){
            delete window[callbackName];
            if(_.isFunction(callbackError)) {
                callbackError();
            }
        }, 10000);
        // The custom callback to receive the jsonp response from the yelp API
        window[callbackName] = function (data) {
            // Cancel the timeout
            clearTimeout(timeout);
            // destroy the callback
            delete window[callbackName];
            // execute the callback with the response
            if(_.isFunction(callbackSuccess) && !_.isUndefined(data)) {
                callbackSuccess(placeId, data);
            } else if (_.isFunction(callbackError)) {
                callbackError();
            }
        };
        $.ajax({
            url: 'http://api.yelp.com/v2/search',
            dataType: 'jsonp',
            jsonpCallback: callbackName,
            jsonp: 'callback',
            cache: true,
            data: oauth.authorize(request, oauthToken)
        });
    },
    /**
     * Search for a foursquare business that matches with the google place result.
     * @param {string} placeId - Google Places API identifier
     * @param {string} placeName - Name of the location
     * @param {string} placeLocLat - Latitude of the location
     * @param {string} placeLocLng - Longitude of the location
     * @param {string} placeLocation - City where the location is
     * @param {function} callbackSuccess - Callback to be executed when the request was succesful
     * @param {function} callbackError - Callback to be executed when the request failed
     */
    searchFoursquareBusiness: function(placeId, placeName, placeLocLat, placeLocLng, placeLocation, callbackSuccess, callbackError) {
        var c = (new Date()).getTime(), // milliseconds to name the custom callback
            params = {
                client_id: 'CXKRXUECPPORHVJPSUPCXZU20DCKOBIHNYSISD1LZMZXJJMD',
                client_secret: 'VNPDWMWMO5GFK1FR23PW1FM5TATJX5XMWGVZF1IFTLBGYHSP',
                v: 20130815,
                query: placeName,
                ll: placeLocLat+','+placeLocLng,
                near: placeLocation,
                limit: 1
            },
            callbackName = 'foursquare_callback_'+(c+placeId+'').replace(/[^0-9A-Za-z_]/g,'_');  // a valid jsonp callback name
        // Create a timeout of 10 seconds to destroy the callback function
        // and execute the callbackError
        var timeout = setTimeout(function(){
            delete window[callbackName];
            if(_.isFunction(callbackError)) {
                callbackError();
            }
        }, 10000);
        // The custom callback to receive the jsonp response from the foursquare API
        window[callbackName] = function (data) {
            // Cancel the timeout
            clearTimeout(timeout);
            // destroy the callback
            delete window[callbackName];
            // execute the callback with the response
            if(_.isFunction(callbackSuccess) && !_.isUndefined(data)) {
                callbackSuccess(placeId, data);
            } else if (_.isFunction(callbackError)) {
                callbackError();
            }
        };

        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/search',
            dataType: 'jsonp',
            jsonpCallback: callbackName,
            jsonp: 'callback',
            data: params
        });
    }
};
