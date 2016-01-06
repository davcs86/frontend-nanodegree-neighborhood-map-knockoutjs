/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "", "varsIgnorePattern": "LocationsModel" }]*/
/*global store,_*/

/**
 * Cache of locations that regards in localStorage, in the last case in
 * the hardcoded locations.
 */
var hardcodedLocations = {};
var LocationsModel = {
    items: {},
    start: function() {
        var stored = store.get('FEND-P5_davcs86_KOjs');
        LocationsModel.items = (_.isUndefined(stored) ? hardcodedLocations : stored);
    },
    save : function() {
        store.set('FEND-P5_davcs86_KOjs', LocationsModel.items);
    },
    remove : function(){
        store.remove('FEND-P5_davcs86_KOjs');
    }
};
LocationsModel.start();
