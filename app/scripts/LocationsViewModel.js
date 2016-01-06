/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "n|jqxhr", "varsIgnorePattern": "LocationsViewModel|initApp" }]*/
/*eslint-disable no-console */
/*global LocationsModel,LocationsFactory,ko,google,_*/
var LocationsViewModel = function() {
    var vm = this;
    vm.map = null;
    vm.hidePreloader = true;
    /**
     * Method that initialize the map.
     * It stores the reference to the map in a variable (vm.map),
     * also sets the event listeners to update the locations after user drags the map
     * or when changes of zoom level.
     * Also, creates the shared InfoWindow for all the markers
     */
    vm.initMap = function(){
        // Define the map
        vm.map = new google.maps.Map(document.getElementById('google-map'), {
            center: {lat: 37.77493, lng: -122.41942},
            zoom: 12,
            minZoom: 8,
            streetViewControl: false
        });
        // Add event listeners for dragend and zoom_changed for the map
        google.maps.event.addListener(vm.map, 'dragend', vm.updateLocations);
        google.maps.event.addListener(vm.map, 'zoom_changed', vm.updateLocations);
        // Define the infowindow
        vm.infowindow = new google.maps.InfoWindow({maxWidth: 220});
        // Sets the close event listener for the infowindow
        google.maps.event.addListener(vm.infowindow, 'closeclick', function() {
            vm.selectItem(null);
        });
        /**
         * Waits 1s before load the locations (tries to ensure that functions like map.getCenter() and map.getBounds() return a value)
         */
        setTimeout(function(){
            // update the locations
            vm.updateLocations();
        }, 1000);
    }
    // Array of markers in the map
    vm.markers = [];
    /**
     * Observable variables:
     * - selectedMarkerId: stores the place_id of the location selected
     * - filterQuery: the query from the input and used to filter
     * - filterByName: boolean binded to the checkbox filter by name
     * - filterByVicinity: boolean binded to the checkbox filter by address
     * - visibleLocations: array of locations returned by google places api
     **/
    vm.selectedMarkerId = ko.observable(null).extend({ notify: 'always'});
    vm.filterQuery = ko.observable('');
    vm.filterByName = ko.observable(true);
    vm.filterByVicinity = ko.observable(false);
    vm.visibleLocations = ko.observableArray([]);
    /**
     * Returns a location (with data from all apis) from the dictionary LocationsModel
     * based on its place_id from the Google Places API
     * @param {string} place_id - Google Places API identifier
     */
    vm.getLocItem = function(place_id){
        var item = LocationsModel.items[place_id];
        return (_.isUndefined(item)) ? false : item;
    }
    /**
     * Returns the current selected item (it's calculated because needs to detect
     * any change and update the infowindow)
     */
    vm.getSelItem = ko.pureComputed(function() {
        return vm.getLocItem(vm.selectedMarkerId());
    }, vm).extend({ notify: 'always'});
    /**
     * Filter the visibleLocations array based on the query from the input
     * also by name and/or by address.
     * It's calculated because needs to update the listview and the markers.
     */
    vm.filteredLocations = ko.pureComputed(function() {
        var resolved = [];
        _.forEach(vm.visibleLocations(), function(n){
            var item = vm.getLocItem(n);
            if (!_.isUndefined(item)){
                // apply filters
                var query = vm.filterQuery().toLowerCase();
                if (query.length>0) {
                    var allowByName = vm.filterByName() && (item.google.name.toLowerCase().indexOf(query)>=0);
                    var allowByVicinity = vm.filterByVicinity() && (item.google.vicinity.toLowerCase().indexOf(query)>=0);
                    if (!allowByName && !allowByVicinity) { return; }
                }
                resolved.push(item);
            }
        });
        return vm.updateMarkers(resolved);
    }, vm);
    /**
     * Create the markers based on vm.filteredLocations
     */
    vm.updateMarkers = function(filteredLocations){
        // destroy current markers
        _.forEach(vm.markers, function(n) {
            n.setMap(null);
        });
        vm.markers = [];
        // create the new markers
        _.forEach(filteredLocations, function (n){
            vm.markers.push(vm.createMarker(n));
        });
        return filteredLocations;
    }
    /**
     * Create a marker in the map
     */
    vm.createMarker = function(item) {
        var marker = new google.maps.Marker({
            position: {lat: item.google.loc.lat, lng: item.google.loc.lng},
            map: vm.map,
            title: item.google.name
        });
        marker.set('id', item.id);
        marker.addListener('click', vm.clickMarker);
        return marker;
    }
    /**
     * Click marker event listener
     */
    vm.clickMarker = function(){
        /// do whatever
        vm.selectItem(this.get('id'));
    }
    /**
     * Handles the click over a list item.
     */
    vm.clickListItem = function(data){
        vm.selectItem(data.id);
    }
     /**
      * Select (saves its identifier) the marker of a item,
      * sets the marker animation and if apply, open/hide the
      * infowindow. Also removes the selection from the listview.
      * @param {string} place_id - Google Places API identifier
      */
    vm.selectItem = function(place_id) {
        vm.selectedMarkerId(place_id);
        vm.getSelItem(); // try to update it
        vm.selectedMarkerId();
        if (_.isString(place_id)){// && !_.indexOf(vm.visibleLocations,place_id)>=0) {
            _.forEach(vm.markers, function(n){
                if (n.get('id')===place_id){
                    n.setAnimation('BOUNCE');
                    // open infowindow attached to this marker
                    vm.infowindow.setContent(document.getElementById('infowindow').innerHTML);
                    vm.infowindow.open(vm.map, n);
                } else {
                    // stop all other markers' animations
                    n.setAnimation(null);
                }
            });
            // in case the sidenav is open in a small screen, simulate a click on the darker area to hide it.
            $('.mdl-layout__obfuscator.is-visible').click();
        }
    }
    /**
     * For each result returned by the Google Places API, store it in the vm.mapLocations
     * variable to make it usable by the listview and the map markers.
     * But before, it resolves the values for location.google.photos[0].getUrl40,
     * location.google.photos[0].getUrl280, location.google.geometry.location.lat
     * and location.google.geometry.location.lng in order to have the raw values
     * instead of functions that can't be stored in a json string.
     * Also, launch the async calls to Yelp and Foursquare APIs.
     * @param {object} googleResultsArray - Array with the results from the Google Places API
     */
    vm.processGoogleResponse = function(googleResultsArray) {
        // clean the array of locations returned by google places api
        var locations = [];
        _.forEach(googleResultsArray, function(n) {
            var place_id = n.place_id,
                locationSimplified = _.trim((_.words(n.vicinity, /[^,]+/g)).pop()),
                newLocationObj = {
                    id: place_id,
                    google: vm.extractGoogleResult(n),
                    yelp: null,
                    foursquare: null
                }
            // store the place_id of this result
            locations.push(place_id);
            if (_.isUndefined(LocationsModel.items[place_id])) {
                // store in the cache
                LocationsModel.items[place_id] = newLocationObj;
            } else {
                LocationsModel.items[place_id].google = newLocationObj.google;
            }
            // if the cache doesn't have this data
            if (_.isNull(LocationsModel.items[place_id].yelp)) {
                // then retrieve it from foursquare API
                LocationsFactory.searchYelpBusiness(
                    newLocationObj.id,
                    newLocationObj.google.name,
                    newLocationObj.google.loc.lat,
                    newLocationObj.google.loc.lng,
                    locationSimplified,
                    vm.processYelpResponse);
            }
            // if the cache doesn't have this data
            if (_.isNull(LocationsModel.items[place_id].foursquare)) {
                // then retrieve it from foursquare API
                LocationsFactory.searchFoursquareBusiness(
                    newLocationObj.id,
                    newLocationObj.google.name,
                    newLocationObj.google.loc.lat,
                    newLocationObj.google.loc.lng,
                    locationSimplified,
                    vm.processFoursquareResponse);
            }
        });
        vm.visibleLocations(locations);
        // Save the cache to localStorage
        LocationsModel.save();
    }
    /**
     * Extract only the necessary data from google API
     */
    vm.extractGoogleResult = function(item) {
        // resolve photos urls
        var data = {
            loc: {
                lat: item.geometry.location.lat(),
                lng: item.geometry.location.lng()
            },
            photo_small: item.icon,
            photo_big: item.icon,
            open_now: 'N/A',
            types: item.types,
            rating: 'N/A',
            name: item.name,
            vicinity: item.vicinity
        };
        // resolve photos
        if (_.isArray(item.photos) && item.photos.length > 0) {
            data.photo_small = item.photos[0].getUrl({maxHeight:50,maxWidth:50});
            data.photo_big = item.photos[0].getUrl({maxHeight:280,maxWidth:280});
        }
        // opening hours
        if (!_.isUndefined(item.opening_hours)){
            data.open_now = (item.opening_hours.open_now)?'Yes':'No';
        }
        // rating
        if (!_.isUndefined(item.rating)){
            data.rating = item.rating + ' / 5.0';
        }
        return data;
    }
    /**
     * If Yelp API returned a value, store it in cache (vm.allLocations)
     * @param {string} place_id - Google Places API identifier
     * @param {object} response - Response from the API
     */
    vm.processYelpResponse = function(place_id, response) {
        // if returned a value
        if (!_.isUndefined(response) && !_.isUndefined(response.businesses) && response.businesses.length > 0) {
            // store it in cache (LocationsModel.items)
            LocationsModel.items[place_id].yelp = vm.extractYelpResult(response.businesses[0]);
            // Save the cache to localStorage
            LocationsModel.save();
        }
    }
    /**
     * Extract only the necessary data from Yelp API
     */
    vm.extractYelpResult = function(item) {
        var data = {
            rating: item.rating+' / 5.0',
            review_count: item.review_count,
            url: item.url
        };
        return data;
    }
    /**
     * If Foursquare API returned a value, store it in cache (vm.allLocations)
     * @param {string} place_id - Google Places API identifier
     * @param {object} response - Response from the API
     */
    vm.processFoursquareResponse = function(place_id, response) {
        // if returned a value
        if (!_.isUndefined(response) && !_.isUndefined(response.response) && !_.isUndefined(response.response.venues) && response.response.venues.length > 0) {
            // store it in cache  (LocationsModel.items)
            LocationsModel.items[place_id].foursquare = vm.extractFoursquareResult(response.response.venues[0]);
            // Save the cache to localStorage
            LocationsModel.save();
        }
    }
    /**
     * Extract only the necessary data from Foursquare API
     */
    vm.extractFoursquareResult = function(item) {
        var data = {
            checkinsCount: item.stats.checkinsCount,
            tipCount: item.stats.tipCount,
            hasMenu: _.isUndefined(item.hasMenu)?false:item.hasMenu,
            hasSpecial: false,
            specialMsg: '',
            url: 'https://foursquare.com/v/'+item.id
        };
        // Extract specials
        if (item.specials.count > 0){
            data.hasSpecial = true;
            data.specialMsg = item.specials.items[0].message;
        }
        return data;
    }
    /**
     * Load the locations from Google Places API, or from the cache when API fails.
     */
    vm.updateLocations = function() {
        // Get the map bounds
        var bounds = vm.map.getBounds();
        // De-select the marker
        vm.selectItem(null);
        if (!_.isUndefined(bounds)) {
            // If the map has bounds, call Google Places API
            LocationsFactory.getGoogleNearbyPlaces(
                vm.map,
                bounds,
                vm.processGoogleResponse,
                vm.loadAllLocations);
        } else {
            // Load the locations from the cache (LocationsModel.items)
            vm.loadAllLocations();
        }
    }
    /**
     * Load the locations from cache (LocationsModel.items).
     */
    vm.loadAllLocations = function() {
        var locations = [];
        _.forIn(LocationsModel.items, function(n, key) {
            locations.push(key);
        });
        vm.visibleLocations(locations);
    }

    // Waits for hide the preloader by KO
    // google maps has problems when is rendered in hidden state
    setTimeout(function(){
        // Start everything
        vm.initMap();
    }, 1000);
};
// Invoked by Google Maps API
function initApp(){
    ko.applyBindings(new LocationsViewModel());
    $(document).ajaxSend(function( event, jqxhr, settings ) {
        // Trick to delete an extra parameter in the url, which is consequence of OAuth
        settings.url = settings.url.replace(/&callback=yelp_[^&]+/, '');
    });
}
