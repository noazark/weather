/**
 * Converts a temperature in Celsius to Kelvin
 * 
 * @param {number} value the temperature in Celsius
 * @returns {number}
 */
export function celsiusToKelvin( value ) {
    return value + 273.15;
}

/**
 * Converts a temperature in Celsius to Fahrenheit
 * 
 * @param {number} value The temperature in Celsius
 * @returns {number}
 */
export function celsiusToFahrenheit( value ) {
    return ( value * 1.8 ) + 32;
}

/**
 * Converts a temperature in Fahrenheit to Celsius
 * 
 * @param {number} value The temperature in Fahrenheit
 * @returns {number}
 */
export function fahrenheitToCelsius( value ) {
    return ( value - 32 ) / 1.8;
}

/**
 * Converts a temperature in Fahrenheit to Kelvin
 * 
 * @param {number} value The temperature in Fahrenheit
 * @returns {number}
 */
export function fahrenheitToKelvin( value ) {
    return celsiusToKelvin( fahrenheitToCelsius( value ) );
}

/**
 *Converts a temperature in Kelvin to Celsius
 * 
 * @param {number} value The temperature in Kelvin
 * @returns {number}
 */
export function kelvinToCelsius( value ) {
    return value - 273.15;
}

/**
 * Converts a temperature in Kelvin to Fahrenheit
 * 
 * @param {number} value The temperature in Kelvin
 * @returns {number}
 */
export function kelvinToFahrenheit( value ) {
    return celsiusToFahrenheit( kelvinToCelsius( value ) );
}

/**
 * Returns true if the value is empty, otherwise it returns false. The value is deemed to be empty if it is either: null, undefined, a zero-length array or a zero-length string
 * 
 * @param {object} value An object or array
 * @returns {boolean}
 */
export function isEmpty( obj ) {
    return ( obj == null ) || ( obj === '' ) || ( Array.isArray( obj ) && obj.length === 0 );
}
