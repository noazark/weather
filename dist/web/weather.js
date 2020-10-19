/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "helpers", function() { return /* binding */ helpers; });
__webpack_require__.d(__webpack_exports__, "OWMClient", function() { return /* binding */ OWMClient; });

// NAMESPACE OBJECT: ./src/helpers/helpers.js
var helpers_namespaceObject = {};
__webpack_require__.r(helpers_namespaceObject);
__webpack_require__.d(helpers_namespaceObject, "celsiusToKelvin", function() { return celsiusToKelvin; });
__webpack_require__.d(helpers_namespaceObject, "celsiusToFahrenheit", function() { return celsiusToFahrenheit; });
__webpack_require__.d(helpers_namespaceObject, "fahrenheitToCelsius", function() { return fahrenheitToCelsius; });
__webpack_require__.d(helpers_namespaceObject, "fahrenheitToKelvin", function() { return fahrenheitToKelvin; });
__webpack_require__.d(helpers_namespaceObject, "kelvinToCelsius", function() { return kelvinToCelsius; });
__webpack_require__.d(helpers_namespaceObject, "kelvinToFahrenheit", function() { return kelvinToFahrenheit; });
__webpack_require__.d(helpers_namespaceObject, "isEmpty", function() { return isEmpty; });

// CONCATENATED MODULE: ./src/helpers/helpers.js
/**
 * Converts a temperature in Celsius to Kelvin
 *
 * @param {number} value the temperature in Celsius
 * @returns {number}
 */
function celsiusToKelvin( value ) {
    return value + 273.15;
}

/**
 * Converts a temperature in Celsius to Fahrenheit
 *
 * @param {number} value The temperature in Celsius
 * @returns {number}
 */
function celsiusToFahrenheit( value ) {
    return ( value * 1.8 ) + 32;
}

/**
 * Converts a temperature in Fahrenheit to Celsius
 *
 * @param {number} value The temperature in Fahrenheit
 * @returns {number}
 */
function fahrenheitToCelsius( value ) {
    return ( value - 32 ) / 1.8;
}

/**
 * Converts a temperature in Fahrenheit to Kelvin
 *
 * @param {number} value The temperature in Fahrenheit
 * @returns {number}
 */
function fahrenheitToKelvin( value ) {
    return celsiusToKelvin( fahrenheitToCelsius( value ) );
}

/**
 *Converts a temperature in Kelvin to Celsius
 *
 * @param {number} value The temperature in Kelvin
 * @returns {number}
 */
function kelvinToCelsius( value ) {
    return value - 273.15;
}

/**
 * Converts a temperature in Kelvin to Fahrenheit
 *
 * @param {number} value The temperature in Kelvin
 * @returns {number}
 */
function kelvinToFahrenheit( value ) {
    return celsiusToFahrenheit( kelvinToCelsius( value ) );
}

/**
 * Returns true if the value is empty, otherwise it returns false. The value is deemed to be empty if it is either: null, undefined, a zero-length array or a zero-length string
 *
 * @param {object} value An object or array
 * @returns {boolean}
 */
function isEmpty( obj ) {
    return ( obj == null ) || ( obj === '' ) || ( Array.isArray( obj ) && obj.length === 0 );
}

// CONCATENATED MODULE: ./src/clients/owm.js
/* harmony default export */ var owm = (class {
    constructor( options ) {
        this.baseUrl = options.baseUrl || 'https://api.openweathermap.org/data/2.5';
        this.appid = options.appid;
    }

    _getJSON( url ) {
        return utils.jsonp( url )
            .then( ( response ) => JSON.parse( response ) );
    }

    getCurrent( city ) {
        let url = `${this.baseUrl}/weather?q=${encodeURIComponent( city )}&appid=${encodeURIComponent( this.appid )}`;

        return this._getJSON( url );
    }

    getForecast( city ) {
        let url = `${this.baseUrl}/forecast?q=${encodeURIComponent( city )}&appid=${encodeURIComponent( this.appid )}`;

        return this._getJSON( url );
    }
});

function endsAt( resource ) {
    let getTime = ( r ) => r[ 'dt' ] * 1000;

    if ( resource.hasOwnProperty( 'list' ) ) {
        return new Date( Math.max( ...resource[ 'list' ].map( getTime ) ) );
    } else {
        return new Date( getTime( resource ) );
    }

}

function lat( resource ) {
    if ( resource.hasOwnProperty( 'coord' ) ) {
        return resource[ 'coord' ][ 'lat' ];
    } else {
        return resource[ 'city' ][ 'coord' ][ 'lat' ];
    }
}

function latlon( resource ) {
    return [ lat( resource ), lon( resource ) ];
}

function lon( resource ) {
    if ( resource.hasOwnProperty( 'coord' ) ) {
        return resource[ 'coord' ][ 'lon' ];
    } else {
        return resource[ 'city' ][ 'coord' ][ 'lon' ];
    }
}

function high( resource ) {
    let getHigh = ( r ) => r[ 'main' ][ 'temp' ];

    if ( resource.hasOwnProperty( 'list' ) ) {
        return Math.max( ...resource[ 'list' ].map( getHigh ) );
    } else {
        throw new Error( 'Cannot use high() on with the Current API, use high() or low()' );
    }
}

function low( resource ) {
    let getLow = ( r ) => r[ 'main' ][ 'temp' ];

    if ( resource.hasOwnProperty( 'list' ) ) {
        return Math.min( ...resource[ 'list' ].map( getLow ) );
    } else {
        throw new Error( 'Cannot use high() on with the Current API, use high() or low()' );
    }
}

function startsAt( resource ) {
    let getTime = ( r ) => r[ 'dt' ] * 1000;

    if ( resource.hasOwnProperty( 'list' ) ) {
        return new Date( Math.min( ...resource[ 'list' ].map( getTime ) ) );
    } else {
        return new Date( getTime( resource ) );
    }
}

function temperature( resource ) {
    let getTemp = ( r ) => r[ 'main' ][ 'temp' ];

    if ( !resource.hasOwnProperty( 'list' ) ) {
        return getTemp( resource );
    } else {
        return resource[ 'list' ].map( getTemp );
    }
}

const utils = {
    jsonp( uri ) {
        return new Promise( function( resolve, reject ) {
            let id = `_${Math.round( 10000 * Math.random() )}`;
            let callbackName = `jsonp_callback_${id}`;
            let el = ( document.getElementsByTagName( 'head' )[ 0 ] || document.body || document.documentElement );
            let script = document.createElement( 'script' );
            let src = uri + '&callback=' + callbackName;

            window[ callbackName ] = function( data ) {
                delete window[ callbackName ];
                let el = document.getElementById( id );
                el.parentNode.removeChild( el );
                resolve( data );
            };

            script.src = src;
            script.id = id;
            script.addEventListener( 'error', () => reject( new Error( 'Request failed' ) ) );
            el.appendChild( script );
        } );
    }
};
// CONCATENATED MODULE: ./weather.js



const helpers = helpers_namespaceObject;
const OWMClient = owm;


/***/ })
/******/ ]);