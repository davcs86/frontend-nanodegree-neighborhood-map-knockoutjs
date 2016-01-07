function OAuth(a){if(!(this instanceof OAuth))return new OAuth(a);if(a||(a={}),!a.consumer)throw new Error("consumer option is required");switch(this.consumer=a.consumer,this.signature_method=a.signature_method||"HMAC-SHA1",this.nonce_length=a.nonce_length||32,this.version=a.version||"1.0",this.parameter_seperator=a.parameter_seperator||", ",this.last_ampersand="undefined"==typeof a.last_ampersand?!0:a.last_ampersand,this.signature_method){case"HMAC-SHA1":this.hash=function(a,b){return CryptoJS.HmacSHA1(a,b).toString(CryptoJS.enc.Base64)};break;case"HMAC-SHA256":this.hash=function(a,b){return CryptoJS.HmacSHA256(a,b).toString(CryptoJS.enc.Base64)};break;case"PLAINTEXT":this.hash=function(a,b){return b};break;case"RSA-SHA1":throw new Error("oauth-1.0a does not support this signature method right now. Coming Soon...");default:throw new Error("The OAuth 1.0a protocol defines three signature methods: HMAC-SHA1, RSA-SHA1, and PLAINTEXT only")}}function initApp(){ko.applyBindings(new LocationsViewModel),$(document).ajaxSend(function(a,b,c){c.url=c.url.replace(/&callback=yelp_[^&]+/,"")})}"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return rx_escapable.lastIndex=0,rx_escapable.test(a)?'"'+a.replace(rx_escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.store=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){(function(a){"use strict";b.exports=function(){function b(){try{return g in e&&e[g]}catch(a){return!1}}var c,d={},e="undefined"!=typeof window?window:a,f=e.document,g="localStorage",h="script";if(d.disabled=!1,d.version="1.3.20",d.set=function(){},d.get=function(){},d.has=function(a){return void 0!==d.get(a)},d.remove=function(){},d.clear=function(){},d.transact=function(a,b,c){null==c&&(c=b,b=null),null==b&&(b={});var e=d.get(a,b);c(e),d.set(a,e)},d.getAll=function(){},d.forEach=function(){},d.serialize=function(a){return JSON.stringify(a)},d.deserialize=function(a){if("string"==typeof a)try{return JSON.parse(a)}catch(b){return a||void 0}},b())c=e[g],d.set=function(a,b){return void 0===b?d.remove(a):(c.setItem(a,d.serialize(b)),b)},d.get=function(a,b){var e=d.deserialize(c.getItem(a));return void 0===e?b:e},d.remove=function(a){c.removeItem(a)},d.clear=function(){c.clear()},d.getAll=function(){var a={};return d.forEach(function(b,c){a[b]=c}),a},d.forEach=function(a){for(var b=0;b<c.length;b++){var e=c.key(b);a(e,d.get(e))}};else if(f&&f.documentElement.addBehavior){var i,j;try{j=new ActiveXObject("htmlfile"),j.open(),j.write("<"+h+">document.w=window</"+h+'><iframe src="/favicon.ico"></iframe>'),j.close(),i=j.w.frames[0].document,c=i.createElement("div")}catch(k){c=f.createElement("div"),i=f.body}var l=function(a){return function(){var b=Array.prototype.slice.call(arguments,0);b.unshift(c),i.appendChild(c),c.addBehavior("#default#userData"),c.load(g);var e=a.apply(d,b);return i.removeChild(c),e}},m=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),n=function(a){return a.replace(/^d/,"___$&").replace(m,"___")};d.set=l(function(a,b,c){return b=n(b),void 0===c?d.remove(b):(a.setAttribute(b,d.serialize(c)),a.save(g),c)}),d.get=l(function(a,b,c){b=n(b);var e=d.deserialize(a.getAttribute(b));return void 0===e?c:e}),d.remove=l(function(a,b){b=n(b),a.removeAttribute(b),a.save(g)}),d.clear=l(function(a){var b=a.XMLDocument.documentElement.attributes;a.load(g);for(var c=b.length-1;c>=0;c--)a.removeAttribute(b[c].name);a.save(g)}),d.getAll=function(){var a={};return d.forEach(function(b,c){a[b]=c}),a},d.forEach=l(function(a,b){for(var c,e=a.XMLDocument.documentElement.attributes,f=0;c=e[f];++f)b(c.name,d.deserialize(a.getAttribute(c.name)))})}try{var o="__storejs__";d.set(o,o),d.get(o)!=o&&(d.disabled=!0),d.remove(o)}catch(k){d.disabled=!0}return d.enabled=!d.disabled,d}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});var CryptoJS=CryptoJS||function(a,b){var c={},d=c.lib={},e=d.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;return b&&c.mixIn(b),c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)}),c.init.prototype=c,c.$super=this,c},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),f=d.WordArray=e.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,e=a.sigBytes;if(this.clamp(),d%4)for(var f=0;e>f;f++){var g=c[f>>>2]>>>24-f%4*8&255;b[d+f>>>2]|=g<<24-(d+f)%4*8}else if(c.length>65535)for(var f=0;e>f;f+=4)b[d+f>>>2]=c[f>>>2];else b.push.apply(b,c);return this.sigBytes+=e,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-c%4*8,b.length=a.ceil(c/4)},clone:function(){var a=e.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c=[],d=0;b>d;d+=4)c.push(4294967296*a.random()|0);return new f.init(c,b)}}),g=c.enc={},h=g.Hex={stringify:function(a){for(var b=a.words,c=a.sigBytes,d=[],e=0;c>e;e++){var f=b[e>>>2]>>>24-e%4*8&255;d.push((f>>>4).toString(16)),d.push((15&f).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-d%8*4;return new f.init(c,b/2)}},i=g.Latin1={stringify:function(a){for(var b=a.words,c=a.sigBytes,d=[],e=0;c>e;e++){var f=b[e>>>2]>>>24-e%4*8&255;d.push(String.fromCharCode(f))}return d.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-d%4*8;return new f.init(c,b)}},j=g.Utf8={stringify:function(a){try{return decodeURIComponent(escape(i.stringify(a)))}catch(b){throw new Error("Malformed UTF-8 data")}},parse:function(a){return i.parse(unescape(encodeURIComponent(a)))}},k=d.BufferedBlockAlgorithm=e.extend({reset:function(){this._data=new f.init,this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,g=this.blockSize,h=4*g,i=e/h;i=b?a.ceil(i):a.max((0|i)-this._minBufferSize,0);var j=i*g,k=a.min(4*j,e);if(j){for(var l=0;j>l;l+=g)this._doProcessBlock(d,l);var m=d.splice(0,j);c.sigBytes-=k}return new f.init(m,k)},clone:function(){var a=e.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0}),l=(d.Hasher=k.extend({cfg:e.extend(),init:function(a){this.cfg=this.cfg.extend(a),this.reset()},reset:function(){k.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){a&&this._append(a);var b=this._doFinalize();return b},blockSize:16,_createHelper:function(a){return function(b,c){return new a.init(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return new l.HMAC.init(a,c).finalize(b)}}}),c.algo={});return c}(Math);!function(){{var a=CryptoJS,b=a.lib,c=b.WordArray,d=a.enc;d.Base64={stringify:function(a){var b=a.words,c=a.sigBytes,d=this._map;a.clamp();for(var e=[],f=0;c>f;f+=3)for(var g=b[f>>>2]>>>24-f%4*8&255,h=b[f+1>>>2]>>>24-(f+1)%4*8&255,i=b[f+2>>>2]>>>24-(f+2)%4*8&255,j=g<<16|h<<8|i,k=0;4>k&&c>f+.75*k;k++)e.push(d.charAt(j>>>6*(3-k)&63));var l=d.charAt(64);if(l)for(;e.length%4;)e.push(l);return e.join("")},parse:function(a){var b=a.length,d=this._map,e=d.charAt(64);if(e){var f=a.indexOf(e);-1!=f&&(b=f)}for(var g=[],h=0,i=0;b>i;i++)if(i%4){var j=d.indexOf(a.charAt(i-1))<<i%4*2,k=d.indexOf(a.charAt(i))>>>6-i%4*2;g[h>>>2]|=(j|k)<<24-h%4*8,h++}return c.create(g,h)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}}(),function(){{var a=CryptoJS,b=a.lib,c=b.Base,d=a.enc,e=d.Utf8,f=a.algo;f.HMAC=c.extend({init:function(a,b){a=this._hasher=new a.init,"string"==typeof b&&(b=e.parse(b));var c=a.blockSize,d=4*c;b.sigBytes>d&&(b=a.finalize(b)),b.clamp();for(var f=this._oKey=b.clone(),g=this._iKey=b.clone(),h=f.words,i=g.words,j=0;c>j;j++)h[j]^=1549556828,i[j]^=909522486;f.sigBytes=g.sigBytes=d,this.reset()},reset:function(){var a=this._hasher;a.reset(),a.update(this._iKey)},update:function(a){return this._hasher.update(a),this},finalize:function(a){var b=this._hasher,c=b.finalize(a);b.reset();var d=b.finalize(this._oKey.clone().concat(c));return d}})}}(),function(){var a=CryptoJS,b=a.lib,c=b.WordArray,d=b.Hasher,e=a.algo,f=[],g=e.SHA1=d.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],g=c[2],h=c[3],i=c[4],j=0;80>j;j++){if(16>j)f[j]=0|a[b+j];else{var k=f[j-3]^f[j-8]^f[j-14]^f[j-16];f[j]=k<<1|k>>>31}var l=(d<<5|d>>>27)+i+f[j];l+=20>j?(e&g|~e&h)+1518500249:40>j?(e^g^h)+1859775393:60>j?(e&g|e&h|g&h)-1894007588:(e^g^h)-899497514,i=h,h=g,g=e<<30|e>>>2,e=d,d=l}c[0]=c[0]+d|0,c[1]=c[1]+e|0,c[2]=c[2]+g|0,c[3]=c[3]+h|0,c[4]=c[4]+i|0},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;return b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=Math.floor(c/4294967296),b[(d+64>>>9<<4)+15]=c,a.sigBytes=4*b.length,this._process(),this._hash},clone:function(){var a=d.clone.call(this);return a._hash=this._hash.clone(),a}});a.SHA1=d._createHelper(g),a.HmacSHA1=d._createHmacHelper(g)}(),function(a){var b=CryptoJS,c=b.lib,d=c.WordArray,e=c.Hasher,f=b.algo,g=[],h=[];!function(){function b(b){for(var c=a.sqrt(b),d=2;c>=d;d++)if(!(b%d))return!1;return!0}function c(a){return 4294967296*(a-(0|a))|0}for(var d=2,e=0;64>e;)b(d)&&(8>e&&(g[e]=c(a.pow(d,.5))),h[e]=c(a.pow(d,1/3)),e++),d++}();var i=[],j=f.SHA256=e.extend({_doReset:function(){this._hash=new d.init(g.slice(0))},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],g=c[3],j=c[4],k=c[5],l=c[6],m=c[7],n=0;64>n;n++){if(16>n)i[n]=0|a[b+n];else{var o=i[n-15],p=(o<<25|o>>>7)^(o<<14|o>>>18)^o>>>3,q=i[n-2],r=(q<<15|q>>>17)^(q<<13|q>>>19)^q>>>10;i[n]=p+i[n-7]+r+i[n-16]}var s=j&k^~j&l,t=d&e^d&f^e&f,u=(d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22),v=(j<<26|j>>>6)^(j<<21|j>>>11)^(j<<7|j>>>25),w=m+v+s+h[n]+i[n],x=u+t;m=l,l=k,k=j,j=g+w|0,g=f,f=e,e=d,d=w+x|0}c[0]=c[0]+d|0,c[1]=c[1]+e|0,c[2]=c[2]+f|0,c[3]=c[3]+g|0,c[4]=c[4]+j|0,c[5]=c[5]+k|0,c[6]=c[6]+l|0,c[7]=c[7]+m|0},_doFinalize:function(){var b=this._data,c=b.words,d=8*this._nDataBytes,e=8*b.sigBytes;return c[e>>>5]|=128<<24-e%32,c[(e+64>>>9<<4)+14]=a.floor(d/4294967296),c[(e+64>>>9<<4)+15]=d,b.sigBytes=4*c.length,this._process(),this._hash},clone:function(){var a=e.clone.call(this);return a._hash=this._hash.clone(),a}});b.SHA256=e._createHelper(j),b.HmacSHA256=e._createHmacHelper(j)}(Math),OAuth.prototype.authorize=function(a,b){var c={oauth_consumer_key:this.consumer["public"],oauth_nonce:this.getNonce(),oauth_signature_method:this.signature_method,oauth_timestamp:this.getTimeStamp(),oauth_version:this.version};return b||(b={}),b["public"]&&(c.oauth_token=b["public"]),a.data||(a.data={}),c.oauth_signature=this.getSignature(a,b.secret,c),c},OAuth.prototype.getSignature=function(a,b,c){return this.hash(this.getBaseString(a,c),this.getSigningKey(b))},OAuth.prototype.getBaseString=function(a,b){return a.method.toUpperCase()+"&"+this.percentEncode(this.getBaseUrl(a.url))+"&"+this.percentEncode(this.getParameterString(a,b))},OAuth.prototype.getParameterString=function(a,b){var c=this.sortObject(this.percentEncodeData(this.mergeObject(b,this.mergeObject(a.data,this.deParamUrl(a.url))))),d="";for(var e in c){var f=c[e];if(f&&Array.isArray(f)){f.sort();var g="";f.forEach(function(a,b){g+=e+"="+a,b<f.length&&(g+="&")}.bind(this)),d+=g}else d+=e+"="+f+"&"}return d=d.substr(0,d.length-1)},OAuth.prototype.getSigningKey=function(a){return a=a||"",this.last_ampersand||a?this.percentEncode(this.consumer.secret)+"&"+this.percentEncode(a):this.percentEncode(this.consumer.secret)},OAuth.prototype.getBaseUrl=function(a){return a.split("?")[0]},OAuth.prototype.deParam=function(a){for(var b=a.split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");c[e[0]]=decodeURIComponent(e[1])}return c},OAuth.prototype.deParamUrl=function(a){var b=a.split("?");return 1===b.length?{}:this.deParam(b[1])},OAuth.prototype.percentEncode=function(a){return encodeURIComponent(a).replace(/\!/g,"%21").replace(/\*/g,"%2A").replace(/\'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29")},OAuth.prototype.percentEncodeData=function(a){var b={};for(var c in a){var d=a[c];if(d&&Array.isArray(d)){var e=[];d.forEach(function(a){e.push(this.percentEncode(a))}.bind(this)),d=e}else d=this.percentEncode(d);b[this.percentEncode(c)]=d}return b},OAuth.prototype.toHeader=function(a){a=this.sortObject(a);var b="OAuth ";for(var c in a)-1!==c.indexOf("oauth_")&&(b+=this.percentEncode(c)+'="'+this.percentEncode(a[c])+'"'+this.parameter_seperator);return{Authorization:b.substr(0,b.length-this.parameter_seperator.length)}},OAuth.prototype.getNonce=function(){for(var a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",b="",c=0;c<this.nonce_length;c++)b+=a[parseInt(Math.random()*a.length,10)];return b},OAuth.prototype.getTimeStamp=function(){return parseInt((new Date).getTime()/1e3,10)},OAuth.prototype.mergeObject=function(a,b){var c=a;for(var d in b)c[d]=b[d];return c},OAuth.prototype.sortObject=function(a){var b=Object.keys(a),c={};b.sort();for(var d=0;d<b.length;d++){var e=b[d];c[e]=a[e]}return c};var LocationsFactory={getGoogleNearbyPlaces:function(a,b,c,d){var e={location:a.getCenter(),bounds:b,types:["food"]},f=new google.maps.places.PlacesService(a);f.nearbySearch(e,function(a,b){b===google.maps.places.PlacesServiceStatus.OK?_.isFunction(c)&&c(a):_.isFunction(d)&&d()})},searchYelpBusiness:function(a,b,c,d,e,f,g){var h=(new Date).getTime(),i=OAuth({consumer:{"public":"-0OmC9HI7oxDSZtNxu8sCQ",secret:"mk6UB3_5uLISj3-9sL_982lOl9M"},signature_method:"HMAC-SHA1"}),j="yelp_callback_"+(h+a+"").replace(/[^0-9A-Za-z_]/g,"_"),k={url:"http://api.yelp.com/v2/search",method:"GET",data:{limit:1,term:b,cll:c+","+d,location:e,callback:j}},l={"public":"v3TxAKHJ7jxke9vbVI-CjBnOfVP2f3DZ",secret:"JWuqPhtTUFsc3k1H0cN5LREpBtA"},m=setTimeout(function(){delete window[j],_.isFunction(g)&&g()},1e4);window[j]=function(b){clearTimeout(m),delete window[j],_.isFunction(f)&&!_.isUndefined(b)?f(a,b):_.isFunction(g)&&g()},$.ajax({url:"http://api.yelp.com/v2/search",dataType:"jsonp",jsonpCallback:j,jsonp:"callback",cache:!0,data:i.authorize(k,l)})},searchFoursquareBusiness:function(a,b,c,d,e,f,g){var h=(new Date).getTime(),i={client_id:"CXKRXUECPPORHVJPSUPCXZU20DCKOBIHNYSISD1LZMZXJJMD",client_secret:"VNPDWMWMO5GFK1FR23PW1FM5TATJX5XMWGVZF1IFTLBGYHSP",v:20130815,query:b,ll:c+","+d,near:e,limit:1},j="foursquare_callback_"+(h+a+"").replace(/[^0-9A-Za-z_]/g,"_"),k=setTimeout(function(){delete window[j],_.isFunction(g)&&g()},1e4);window[j]=function(b){clearTimeout(k),delete window[j],_.isFunction(f)&&!_.isUndefined(b)?f(a,b):_.isFunction(g)&&g()},$.ajax({url:"https://api.foursquare.com/v2/venues/search",dataType:"jsonp",jsonpCallback:j,jsonp:"callback",data:i})}},hardcodedLocations={ChIJcT5nNoaAhYARVdbyW3zPwus:{id:"ChIJcT5nNoaAhYARVdbyW3zPwus",google:{loc:{lat:37.7852279,lng:-122.40438899999998},photo_small:"https://lh4.googleusercontent.com/-9x9fiQuUn3Q/U3pjYN3TgWI/AAAAAAAAACg/r36yNQrQcVc/w50-h50-k/",photo_big:"https://lh4.googleusercontent.com/-9x9fiQuUn3Q/U3pjYN3TgWI/AAAAAAAAACg/r36yNQrQcVc/w280-h280-k/",open_now:"Yes",types:["restaurant","food","lodging","point_of_interest","establishment"],rating:"4.1 / 5.0",name:"San Francisco Marriott Marquis",vicinity:"780 Mission Street, San Francisco"},yelp:{rating:"3.5 / 5.0",review_count:580,url:"http://www.yelp.com/biz/san-francisco-marriott-marquis-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:39686,tipCount:139,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/49d2c3b6f964a520d15b1fe3"}},"ChIJO7u9q5-AhYARiSSXyWv9eJ8":{id:"ChIJO7u9q5-AhYARiSSXyWv9eJ8",google:{loc:{lat:37.77362420000001,lng:-122.42164259999998},photo_small:"https://lh5.googleusercontent.com/-t3vmZY4b6tY/U54RpfGKVoI/AAAAAAACj9o/Rfj5yHVpHcI/w50-h50-k/",photo_big:"https://lh5.googleusercontent.com/-t3vmZY4b6tY/U54RpfGKVoI/AAAAAAACj9o/Rfj5yHVpHcI/w280-h280-k/",open_now:"Yes",types:["restaurant","food","bar","point_of_interest","establishment"],rating:"4.1 / 5.0",name:"Zuni Café.",vicinity:"1658 Market Street, San Francisco"},yelp:{rating:"4 / 5.0",review_count:2194,url:"http://www.yelp.com/biz/zuni-caf%C3%A9-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:12359,tipCount:231,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/435d7580f964a5201a291fe3"}},ChIJ7dtznbWHhYAR81fEwzi58F4:{id:"ChIJ7dtznbWHhYAR81fEwzi58F4",google:{loc:{lat:37.77848519999999,lng:-122.5139633},photo_small:"https://lh6.googleusercontent.com/-mactZS5f0ko/VLf4iwP7WGI/AAAAAAACSyg/nVWzrg1cxcw/w50-h50-k/",photo_big:"https://lh6.googleusercontent.com/-mactZS5f0ko/VLf4iwP7WGI/AAAAAAACSyg/nVWzrg1cxcw/w280-h280-k/",open_now:"Yes",types:["restaurant","food","point_of_interest","establishment"],rating:"3.9 / 5.0",name:"Cliff House",vicinity:"1090 Point Lobos Avenue, San Francisco"},yelp:{rating:"3.5 / 5.0",review_count:1100,url:"http://www.yelp.com/biz/bistro-at-the-cliff-house-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:11638,tipCount:103,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/4bf0588dd5bc0f470f366921"}},ChIJceeAXt6AhYARur0rWLmvt1A:{id:"ChIJceeAXt6AhYARur0rWLmvt1A",google:{loc:{lat:37.8067965,lng:-122.43216889999997},photo_small:"https://lh4.googleusercontent.com/-ofYaD-osinM/Ua5_-S1kOpI/AAAAAAAAFqw/Up4DnNLn9eg/w50-h50-k/",photo_big:"https://lh4.googleusercontent.com/-ofYaD-osinM/Ua5_-S1kOpI/AAAAAAAAFqw/Up4DnNLn9eg/w280-h280-k/",open_now:"No",types:["restaurant","food","point_of_interest","establishment"],rating:"4.1 / 5.0",name:"Greens Restaurant",vicinity:"A, Fort Mason, 2 Marina Boulevard, San Francisco"},yelp:{rating:"4 / 5.0",review_count:1531,url:"http://www.yelp.com/biz/greens-restaurant-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:6022,tipCount:85,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/4a1c397bf964a520257b1fe3"}},"ChIJ0XsfYyZ-j4ARNE4pMC-q7UI":{id:"ChIJ0XsfYyZ-j4ARNE4pMC-q7UI",google:{loc:{lat:37.7691251,lng:-122.41514010000003},photo_small:"https://lh4.googleusercontent.com/-OxBmzm0bP2M/VIp5crcixxI/AAAAAAAAAC4/97VJjly4yzg/w50-h50-k/",photo_big:"https://lh4.googleusercontent.com/-OxBmzm0bP2M/VIp5crcixxI/AAAAAAAAAC4/97VJjly4yzg/w280-h280-k/",open_now:"Yes",types:["grocery_or_supermarket","food","store","health","point_of_interest","establishment"],rating:"4.4 / 5.0",name:"Rainbow Grocery",vicinity:"1745 Folsom Street, San Francisco"},yelp:{rating:"4 / 5.0",review_count:1369,url:"http://www.yelp.com/biz/rainbow-grocery-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:18810,tipCount:130,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/4827b8b1f964a520bb4f1fe3"}},"ChIJG-PkK4-AhYARxW6vm0X9kCQ":{id:"ChIJG-PkK4-AhYARxW6vm0X9kCQ",google:{loc:{lat:37.787184,lng:-122.40744699999999},photo_small:"https://lh5.googleusercontent.com/-_oTHAxnvTlM/VAeKzKLC87I/AAAAAAAAAA4/K7Dux6myrgM/w50-h50-k/",photo_big:"https://lh5.googleusercontent.com/-_oTHAxnvTlM/VAeKzKLC87I/AAAAAAAAAA4/K7Dux6myrgM/w280-h280-k/",open_now:"Yes",types:["restaurant","food","point_of_interest","establishment"],rating:"3.6 / 5.0",name:"The Cheesecake Factory",vicinity:"8th Floor, 251 Geary Street, San Francisco"},yelp:{rating:"3 / 5.0",review_count:2190,url:"http://www.yelp.com/biz/the-cheesecake-factory-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=-0OmC9HI7oxDSZtNxu8sCQ"},foursquare:{checkinsCount:32790,tipCount:381,hasMenu:!0,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/469019cbf964a5209f481fe3"}}},LocationsModel={items:{},start:function(){var a=store.get("FEND-P5_davcs86_KOjs");LocationsModel.items=_.isUndefined(a)?hardcodedLocations:a},save:function(){store.set("FEND-P5_davcs86_KOjs",LocationsModel.items)},remove:function(){store.remove("FEND-P5_davcs86_KOjs")}};LocationsModel.start();var LocationsViewModel=function(){var a=this;a.map=null,a.hidePreloader=!0,a.initMap=function(){a.map=new google.maps.Map(document.getElementById("google-map"),{center:{lat:37.77493,lng:-122.41942},zoom:12,minZoom:8,streetViewControl:!1}),google.maps.event.addListener(a.map,"dragend",a.updateLocations),google.maps.event.addListener(a.map,"zoom_changed",a.updateLocations),a.infowindow=new google.maps.InfoWindow({maxWidth:220}),google.maps.event.addListener(a.infowindow,"closeclick",function(){a.selectItem(null)}),setTimeout(function(){a.updateLocations()},1e3)},a.markers=[],a.selectedMarkerId=ko.observable(null).extend({notify:"always"}),a.filterQuery=ko.observable(""),a.filterByName=ko.observable(!0),a.filterByVicinity=ko.observable(!1),a.visibleLocations=ko.observableArray([]),a.getLocItem=function(a){var b=LocationsModel.items[a];return _.isUndefined(b)?!1:b},a.getSelItem=ko.pureComputed(function(){return a.getLocItem(a.selectedMarkerId())},a).extend({notify:"always"}),a.filteredLocations=ko.pureComputed(function(){var b=[];return _.forEach(a.visibleLocations(),function(c){var d=a.getLocItem(c);if(!_.isUndefined(d)){var e=a.filterQuery().toLowerCase();if(e.length>0){var f=a.filterByName()&&d.google.name.toLowerCase().indexOf(e)>=0,g=a.filterByVicinity()&&d.google.vicinity.toLowerCase().indexOf(e)>=0;if(!f&&!g)return}b.push(d)}}),a.updateMarkers(b)},a),a.updateMarkers=function(b){return _.forEach(a.markers,function(a){a.setMap(null)}),a.markers=[],_.forEach(b,function(b){a.markers.push(a.createMarker(b))}),b},a.createMarker=function(b){var c=new google.maps.Marker({position:{lat:b.google.loc.lat,lng:b.google.loc.lng},map:a.map,title:b.google.name});return c.set("id",b.id),c.addListener("mousedown",a.clickMarker),c},a.clickMarker=function(){a.selectItem(this.get("id"))},a.clickListItem=function(b){a.selectItem(b.id)},a.selectItem=function(b){a.selectedMarkerId(b),a.getSelItem(),_.isString(b)&&(_.forEach(a.markers,function(c){c.get("id")===b?(c.setAnimation("BOUNCE"),a.infowindow.setContent(document.getElementById("infowindow").innerHTML),a.infowindow.open(a.map,c)):c.setAnimation(null)}),$(".mdl-layout__obfuscator.is-visible").click())},a.processGoogleResponse=function(b){var c=[];_.forEach(b,function(b){var d=b.place_id,e=_.trim(_.words(b.vicinity,/[^,]+/g).pop()),f={id:d,google:a.extractGoogleResult(b),yelp:null,foursquare:null};c.push(d),_.isUndefined(LocationsModel.items[d])?LocationsModel.items[d]=f:LocationsModel.items[d].google=f.google,_.isNull(LocationsModel.items[d].yelp)&&LocationsFactory.searchYelpBusiness(f.id,f.google.name,f.google.loc.lat,f.google.loc.lng,e,a.processYelpResponse),_.isNull(LocationsModel.items[d].foursquare)&&LocationsFactory.searchFoursquareBusiness(f.id,f.google.name,f.google.loc.lat,f.google.loc.lng,e,a.processFoursquareResponse)}),a.visibleLocations(c),LocationsModel.save()},a.extractGoogleResult=function(a){var b={loc:{lat:a.geometry.location.lat(),lng:a.geometry.location.lng()},photo_small:a.icon,photo_big:a.icon,open_now:"N/A",types:a.types,rating:"N/A",name:a.name,vicinity:a.vicinity};return _.isArray(a.photos)&&a.photos.length>0&&(b.photo_small=a.photos[0].getUrl({maxHeight:50,maxWidth:50}),b.photo_big=a.photos[0].getUrl({maxHeight:280,maxWidth:280})),_.isUndefined(a.opening_hours)||(b.open_now=a.opening_hours.open_now?"Yes":"No"),_.isUndefined(a.rating)||(b.rating=a.rating+" / 5.0"),b},a.processYelpResponse=function(b,c){!_.isUndefined(c)&&!_.isUndefined(c.businesses)&&c.businesses.length>0&&(LocationsModel.items[b].yelp=a.extractYelpResult(c.businesses[0]),LocationsModel.save())},a.extractYelpResult=function(a){var b={rating:a.rating+" / 5.0",review_count:a.review_count,url:a.url};return b},a.processFoursquareResponse=function(b,c){!_.isUndefined(c)&&!_.isUndefined(c.response)&&!_.isUndefined(c.response.venues)&&c.response.venues.length>0&&(LocationsModel.items[b].foursquare=a.extractFoursquareResult(c.response.venues[0]),LocationsModel.save())},a.extractFoursquareResult=function(a){var b={checkinsCount:a.stats.checkinsCount,tipCount:a.stats.tipCount,hasMenu:_.isUndefined(a.hasMenu)?!1:a.hasMenu,hasSpecial:!1,specialMsg:"",url:"https://foursquare.com/v/"+a.id};return a.specials.count>0&&(b.hasSpecial=!0,b.specialMsg=a.specials.items[0].message),b},a.updateLocations=function(){var b=a.map.getBounds();a.selectItem(null),_.isUndefined(b)?a.loadAllLocations():LocationsFactory.getGoogleNearbyPlaces(a.map,b,a.processGoogleResponse,a.loadAllLocations)},a.loadAllLocations=function(){var b=[];_.forIn(LocationsModel.items,function(a,c){b.push(c)}),a.visibleLocations(b)},setTimeout(function(){a.initMap()},1e3)};