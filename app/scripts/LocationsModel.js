/*eslint no-unused-vars: [2, { "args": "all", "argsIgnorePattern": "", "varsIgnorePattern": "LocationsModel" }]*/
/*eslint-disable no-console */
/*global store,_*/
/**
 * Cache of locations that regards in localStorage, in the last case in
 * the hardcoded locations.
 */
var hardcodedLocations = {
    'ChIJcT5nNoaAhYARVdbyW3zPwus':{
        'id':'ChIJcT5nNoaAhYARVdbyW3zPwus',
        'google':{'loc':{'lat':37.7852279,'lng':-122.40438899999998},'photo_small':'https://lh4.googleusercontent.com/-9x9fiQuUn3Q/U3pjYN3TgWI/AAAAAAAAACg/r36yNQrQcVc/w50-h50-k/','photo_big':'https://lh4.googleusercontent.com/-9x9fiQuUn3Q/U3pjYN3TgWI/AAAAAAAAACg/r36yNQrQcVc/w280-h280-k/','open_now':'Yes','types':['restaurant','food','lodging','point_of_interest','establishment'],'rating':'4.1 / 5.0','name':'San Francisco Marriott Marquis','vicinity':'780 Mission Street, San Francisco'},
        'yelp':{'rating':'3.5 / 5.0','review_count':580,'url':'http://www.yelp.com/biz/san-francisco-marriott-marquis-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':39686,'tipCount':139,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/49d2c3b6f964a520d15b1fe3'}
    },
    'ChIJO7u9q5-AhYARiSSXyWv9eJ8':{
        'id':'ChIJO7u9q5-AhYARiSSXyWv9eJ8',
        'google':{'loc':{'lat':37.77362420000001,'lng':-122.42164259999998},'photo_small':'https://lh5.googleusercontent.com/-t3vmZY4b6tY/U54RpfGKVoI/AAAAAAACj9o/Rfj5yHVpHcI/w50-h50-k/','photo_big':'https://lh5.googleusercontent.com/-t3vmZY4b6tY/U54RpfGKVoI/AAAAAAACj9o/Rfj5yHVpHcI/w280-h280-k/','open_now':'Yes','types':['restaurant','food','bar','point_of_interest','establishment'],'rating':'4.1 / 5.0','name':'Zuni Café.','vicinity':'1658 Market Street, San Francisco'},
        'yelp':{'rating':'4 / 5.0','review_count':2194,'url':'http://www.yelp.com/biz/zuni-caf%C3%A9-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':12359,'tipCount':231,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/435d7580f964a5201a291fe3'}
    },
    'ChIJ7dtznbWHhYAR81fEwzi58F4':{
        'id':'ChIJ7dtznbWHhYAR81fEwzi58F4',
        'google':{'loc':{'lat':37.77848519999999,'lng':-122.5139633},'photo_small':'https://lh6.googleusercontent.com/-mactZS5f0ko/VLf4iwP7WGI/AAAAAAACSyg/nVWzrg1cxcw/w50-h50-k/','photo_big':'https://lh6.googleusercontent.com/-mactZS5f0ko/VLf4iwP7WGI/AAAAAAACSyg/nVWzrg1cxcw/w280-h280-k/','open_now':'Yes','types':['restaurant','food','point_of_interest','establishment'],'rating':'3.9 / 5.0','name':'Cliff House','vicinity':'1090 Point Lobos Avenue, San Francisco'},
        'yelp':{'rating':'3.5 / 5.0','review_count':1100,'url':'http://www.yelp.com/biz/bistro-at-the-cliff-house-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':11638,'tipCount':103,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/4bf0588dd5bc0f470f366921'}
    },
    'ChIJceeAXt6AhYARur0rWLmvt1A':{
        'id':'ChIJceeAXt6AhYARur0rWLmvt1A',
        'google':{'loc':{'lat':37.8067965,'lng':-122.43216889999997},'photo_small':'https://lh4.googleusercontent.com/-ofYaD-osinM/Ua5_-S1kOpI/AAAAAAAAFqw/Up4DnNLn9eg/w50-h50-k/','photo_big':'https://lh4.googleusercontent.com/-ofYaD-osinM/Ua5_-S1kOpI/AAAAAAAAFqw/Up4DnNLn9eg/w280-h280-k/','open_now':'No','types':['restaurant','food','point_of_interest','establishment'],'rating':'4.1 / 5.0','name':'Greens Restaurant','vicinity':'A, Fort Mason, 2 Marina Boulevard, San Francisco'},
        'yelp':{'rating':'4 / 5.0','review_count':1531,'url':'http://www.yelp.com/biz/greens-restaurant-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':6022,'tipCount':85,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/4a1c397bf964a520257b1fe3'}
    },
    'ChIJ0XsfYyZ-j4ARNE4pMC-q7UI':{
        'id':'ChIJ0XsfYyZ-j4ARNE4pMC-q7UI',
        'google':{'loc':{'lat':37.7691251,'lng':-122.41514010000003},'photo_small':'https://lh4.googleusercontent.com/-OxBmzm0bP2M/VIp5crcixxI/AAAAAAAAAC4/97VJjly4yzg/w50-h50-k/','photo_big':'https://lh4.googleusercontent.com/-OxBmzm0bP2M/VIp5crcixxI/AAAAAAAAAC4/97VJjly4yzg/w280-h280-k/','open_now':'Yes','types':['grocery_or_supermarket','food','store','health','point_of_interest','establishment'],'rating':'4.4 / 5.0','name':'Rainbow Grocery','vicinity':'1745 Folsom Street, San Francisco'},
        'yelp':{'rating':'4 / 5.0','review_count':1369,'url':'http://www.yelp.com/biz/rainbow-grocery-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':18810,'tipCount':130,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/4827b8b1f964a520bb4f1fe3'}
    },
    'ChIJG-PkK4-AhYARxW6vm0X9kCQ':{
        'id':'ChIJG-PkK4-AhYARxW6vm0X9kCQ',
        'google':{'loc':{'lat':37.787184,'lng':-122.40744699999999},'photo_small':'https://lh5.googleusercontent.com/-_oTHAxnvTlM/VAeKzKLC87I/AAAAAAAAAA4/K7Dux6myrgM/w50-h50-k/','photo_big':'https://lh5.googleusercontent.com/-_oTHAxnvTlM/VAeKzKLC87I/AAAAAAAAAA4/K7Dux6myrgM/w280-h280-k/','open_now':'Yes','types':['restaurant','food','point_of_interest','establishment'],'rating':'3.6 / 5.0','name':'The Cheesecake Factory','vicinity':'8th Floor, 251 Geary Street, San Francisco'},
        'yelp':{'rating':'3 / 5.0','review_count':2190,'url':'http://www.yelp.com/biz/the-cheesecake-factory-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ'},
        'foursquare':{'checkinsCount':32790,'tipCount':381,'hasMenu':true,'hasSpecial':false,'specialMsg':'','url':'https://foursquare.com/v/469019cbf964a5209f481fe3'}
    }
}
var LocationsModel = {
    items: {},
    start: function() {
        var stored = store.get('FEND-P5_davcs86_KOjs');
        LocationsModel.items = (_.isUndefined(stored) ?  hardcodedLocations : stored);
    },
    save : function() {
        store.set('FEND-P5_davcs86_KOjs', LocationsModel.items);
    },
    remove : function(){
        store.remove('FEND-P5_davcs86_KOjs');
    }
};
LocationsModel.start();
