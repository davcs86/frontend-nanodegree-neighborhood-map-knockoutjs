/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "n", "varsIgnorePattern": "LocationsViewModel" }]*/
/*global LocationsModel,LocationsFactory,ko,google,_*/
var LocationsViewModel = function() {
    var vm = this;
    vm.map = null;
    vm.selectedMarkerId = ko.observable(false);
    vm.filterQuery = ko.observable('');
    vm.filterByName = ko.observable(true);
    vm.filterByVicinity = ko.observable(false);
    vm.visibleLocations = ko.observableArray([]);
    vm.filteredLocations = ko.computed(function() {
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
    });
    vm.parseGoogleLocations = function(googleResultsArray) {
        vm.visibleLocations.removeAll();
        _.forEach(googleResultsArray, function(n) {
            // if exist in cache, simply add the reference to array
            var place_id = n.place_id,
                locationSimplified = _.trim((_.words(n.vicinity, /[^,]+/g)).pop()),
                newLocationObj = {
                    google: n,
                    yelp: null,
                    foursquare: null
                }
            vm.visibleLocations.push(place_id);

            // resolve photos urls
            if (_.isArray(newLocationObj.google.photos) && newLocationObj.google.photos.length > 0) {
                newLocationObj.google.photos[0].getUrl40 = newLocationObj.google.photos[0].getUrl({maxHeight:40,maxWidth:40});
                newLocationObj.google.photos[0].getUrl280 = newLocationObj.google.photos[0].getUrl({maxHeight:140,maxWidth: 280});
            }
            // resolve location's values
            newLocationObj.google.geometry.location.latNum = newLocationObj.google.geometry.location.lat();
            newLocationObj.google.geometry.location.lngNum = newLocationObj.google.geometry.location.lng();

            if (_.isUndefined(LocationsModel.items[place_id])) {
                // store in the cache
                LocationsModel.items[place_id] = newLocationObj;
            } else {
                // update google cache
                LocationsModel.items[place_id].google = newLocationObj.google;
            }

            if (_.isNull(LocationsModel.items[place_id].yelp)) {
                // retrieve yelp info
                LocationsFactory.searchYelpBusiness(
                    newLocationObj.google.place_id,
                    newLocationObj.google.name,
                    newLocationObj.google.geometry.location.latNum,
                    newLocationObj.google.geometry.location.lngNum,
                    locationSimplified,
                    vm.processYelpResponse);
            }
            if (_.isNull(LocationsModel.items[place_id].foursquare)) {
                // retrieve foursquare info
                LocationsFactory.searchFoursquareBusiness(
                    newLocationObj.google.place_id,
                    newLocationObj.google.name,
                    newLocationObj.google.geometry.location.latNum,
                    newLocationObj.google.geometry.location.lngNum,
                    locationSimplified,
                    vm.processFoursquareResponse);
            }
        });
    }
    /**
     * If Yelp API returned a value, store it in cache (vm.allLocations)
     * @param {string} place_id - Google Places API identifier
     * @param {object} response - Response from the API
     */
    vm.processYelpResponse = function(place_id, response) {
        // if returned a value
        //console.log(response);
        if (!_.isUndefined(response) && response.businesses.length > 0) {
            // store it in cache (LocationsModel.items)
            LocationsModel.items[place_id].yelp = response.businesses[0];
        }
    }
    /**
     * If Foursquare API returned a value, store it in cache (vm.allLocations)
     * @param {string} place_id - Google Places API identifier
     * @param {object} response - Response from the API
     */
    vm.processFoursquareResponse = function(place_id, response) {
        // if returned a value
        //console.log(response);
        if (!_.isUndefined(response) && response.data.response.venues.length > 0) {
            // store it in cache (LocationsModel.items)
            LocationsModel.items[place_id].foursquare = response.data.response.venues[0];
        }
    }
    vm.initMap = function(){
        // Stores the map in the scope.
        vm.map = $('#locationsMapElement')[0].map;
        $('#locationsMapElement')[0].addEventListener('google-map-dragend', vm.updateLocations);
        google.maps.event.addListener(vm.map, 'zoom_changed', vm.updateLocations);
        /**
         * Waits 2s before load the locations (tries to ensure that functions like map.getCenter() and map.getBounds() return a value)
         */
        setTimeout(function(){
            vm.updateLocations();
        }, 2000);
    }
    vm.updateLocations = function() {
        // Get the map bounds
        var bounds = vm.map.getBounds();
        //vm.showLoadingBar();
        // De-select the marker
        //vm.selectItem(null);
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
            // hide the loading bar
            //vm.hideLoadingBar();
        }
    }
    vm.loadAllLocations = function() {
        // load locations from cache (LocationsModel.items)
        vm.visibleLocations.removeAll();
        _.forIn(LocationsModel.items, function(n, key) {
            vm.visibleLocations.push(key);
        });
    }
    vm.getLocItem = function(place_id){
        return LocationsModel.items[place_id];
    }
    vm.selectItem = function(place_id) {
        vm.selectedMarkerId(place_id);
    }
    vm.selectListItem = function(data){
        vm.selectItem(data.google.place_id);
    }
};

var koLVM = new LocationsViewModel();

jQuery(function($){
    ko.applyBindings(koLVM);
    $('body').on('google-map-ready','#locationsMapElement', function(ev) {
        ev.stopPropagation();
        // when map is ready, init the view model
        koLVM.initMap();
    });
    $('body').on('google-map-marker-mousedown','*', function(ev) {
        ev.stopPropagation();
        //console.log(this);
        koLVM.selectItem(this.id);
    });
})
