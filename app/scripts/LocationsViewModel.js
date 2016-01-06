/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "n|jqxhr", "varsIgnorePattern": "LocationsViewModel" }]*/
/*global LocationsModel,LocationsFactory,ko,google,_*/
var LocationsViewModel = function() {
    var vm = this;
    // Reference to the map
    vm.map = null;
    // and infowindow object
    vm.infowindow = null;
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
     * It's calculated becuase needs to update the listview and the markers.
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
        return resolved;
    }, vm);
    /**
     * For each result returned by the Google Places API, store it in the vm.mapLocations
     * variable to make it usable by the listview and the map markers.
     * But before, it resolves the values for location.google.photos[0].getUrl40,
     * location.google.photos[0].getUrl280, location.google.geometry.location.latNum
     * and location.google.geometry.location.lngNum in order to have the raw values
     * instead of functions that can't be stored in a json string.
     * Also, launch the async calls to Yelp and Foursquare APIs.
     * @param {object} googleResultsArray - Array with the results from the Google Places API
     */
    vm.parseGoogleLocations = function(googleResultsArray) {
        // clean the array of locations returned by google places api
        vm.visibleLocations.removeAll();
        _.forEach(googleResultsArray, function(n) {
            var place_id = n.place_id,
                locationSimplified = _.trim((_.words(n.vicinity, /[^,]+/g)).pop()),
                newLocationObj = {
                    google: n,
                    yelp: null,
                    foursquare: null
                }
            // store the place_id of this result
            vm.visibleLocations.push(place_id);

            // resolve photos urls
            if (_.isArray(n.photos) && n.photos.length > 0) {
                newLocationObj.google.photos[0].getUrl40 = n.photos[0].getUrl({maxHeight:40,maxWidth:40});
                newLocationObj.google.photos[0].getUrl280 = n.photos[0].getUrl({maxHeight:140,maxWidth: 280});
            }
            // resolve location's values
            newLocationObj.google.geometry.location.latNum = n.geometry.location.lat();
            newLocationObj.google.geometry.location.lngNum = n.geometry.location.lng();

            if (_.isUndefined(LocationsModel.items[place_id])) {
                // store in the cache
                LocationsModel.items[place_id] = newLocationObj;
            } else {
                // update google cache
                LocationsModel.items[place_id].google = newLocationObj.google;
            }
            // if the cache doesn't have this data
            if (_.isNull(LocationsModel.items[place_id].yelp)) {
                // then retrieve it from foursquare API
                LocationsFactory.searchYelpBusiness(
                    newLocationObj.google.place_id,
                    newLocationObj.google.name,
                    newLocationObj.google.geometry.location.latNum,
                    newLocationObj.google.geometry.location.lngNum,
                    locationSimplified,
                    vm.processYelpResponse);
            }
            // if the cache doesn't have this data
            if (_.isNull(LocationsModel.items[place_id].foursquare)) {
                // then retrieve it from foursquare API
                LocationsFactory.searchFoursquareBusiness(
                    newLocationObj.google.place_id,
                    newLocationObj.google.name,
                    newLocationObj.google.geometry.location.latNum,
                    newLocationObj.google.geometry.location.lngNum,
                    locationSimplified,
                    vm.processFoursquareResponse);
            }
        });
        // Save the cache to localStorage
        LocationsModel.save();
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
            LocationsModel.items[place_id].yelp = response.businesses[0];
            // Save the cache to localStorage
            LocationsModel.save();
        }
    }
    /**
     * If Foursquare API returned a value, store it in cache (vm.allLocations)
     * @param {string} place_id - Google Places API identifier
     * @param {object} response - Response from the API
     */
    vm.processFoursquareResponse = function(place_id, response) {
        // if returned a value
        if (!_.isUndefined(response) && !_.isUndefined(response.venues) && response.venues.length > 0) {
            // store it in cache (LocationsModel.items)
            LocationsModel.items[place_id].foursquare = response.venues[0];
            // Save the cache to localStorage
            LocationsModel.save();
        }
    }
    /**
     * Method called when the map initializes.
     * It stores the reference to the map in a variable (vm.map),
     * also sets the event listeners to update the locations after user drags the map
     * or when changes of zoom level.
     * Also, creates the shared InfoWindow for all the markers
     */
    vm.initMap = function(){
        // Stores the map in the scope.
        vm.map = $('#locationsMapElement')[0].map;
        // Add event listeners for dragend and zoom_changed for the map
        $('#locationsMapElement')[0].addEventListener('google-map-dragend', vm.updateLocations);
        google.maps.event.addListener(vm.map, 'zoom_changed', vm.updateLocations);
        // Sets the infowindow
        vm.infowindow = new google.maps.InfoWindow({
            content: $('#infowindow')[0],
            maxWidth: 220
        });
        // Sets the close event listener for the infowindow
        google.maps.event.addListener(vm.infowindow, 'closeclick', function() {
            vm.selectItem(null);
        });
        /**
         * Waits 2s before load the locations (tries to ensure that functions like map.getCenter() and map.getBounds() return a value)
         */
        setTimeout(function(){
            // update the locations
            vm.updateLocations();
        }, 1000);
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
                vm.parseGoogleLocations,
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
        vm.visibleLocations.removeAll();
        _.forIn(LocationsModel.items, function(n, key) {
            vm.visibleLocations.push(key);
        });
    }
    /**
     * Select (saves its identifier) the marker of a item,
     * sets the marker animation and if apply, open/hide the
     * infowindow. Also removes the selection from the listview.
     * @param {string} place_id - Google Places API identifier
     */
    vm.selectItem = function(place_id) {
        vm.selectedMarkerId(place_id);
        //console.log(place_id);
        vm.getSelItem(); // try to update it
        // remove .selected from the list items
        $('div[id^=LL_]').removeClass('active');
        // stop all the animations
        $('google-map-marker[id^=MM_]').each(function( index ) {
            $(this)[0].set('animation', null);
        });
        if (_.isString(place_id) && !_.indexOf(vm.visibleLocations,place_id)>=0) {
            // mark .selected the list item
            $('div#LL_'+place_id).addClass('active');
            // start the selected marker animation
            var markerDOM = $('google-map-marker#MM_'+place_id)[0];
            if (!_.isUndefined(markerDOM)){
                markerDOM.set('animation','BOUNCE');
                // open infowindow attached to the selected marker
                vm.infowindow.setContent($('#infowindow').html());
                vm.infowindow.open(vm.map, markerDOM.marker);
            }
            // in case the sidenav is open in a small screen, simulate a click on the darker area.
            $('.mdl-layout__obfuscator.is-visible').click();
        }
    }
    /**
     * Handles the click over a list item.
     */
    vm.selectListItem = function(data){
        vm.selectItem(data.google.place_id);
    }
};

var koLVM = new LocationsViewModel();

jQuery(function($){
    ko.applyBindings(koLVM);
    $('body').on('google-map-ready','#locationsMapElement', function(ev) {
        // when map is ready, init the view model
        koLVM.initMap();
        ev.stopPropagation();
    });
    $('body').on('google-map-marker-click','*', function(ev) {
        // when user clicks on the map's markers.
        koLVM.selectItem(this.id.replace('MM_',''));
        ev.stopPropagation();
    });
    $(document).ajaxSend(function( event, jqxhr, settings ) {
        // Trick to delete an extra parameter in the url
        settings.url = settings.url.replace(/&callback=yelp_[^&]+/, '');
    });
});
