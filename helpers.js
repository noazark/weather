export function celsiusToKelvin(val) {
  return val + 273.15;
}

export function celsiusToFahrenheit(val) {
  return (val * 1.8) + 32;
}

export function fahrenheitToCelsius(val) {
  return (val - 32) / 1.8;
}

export function fahrenheitToKelvin(val) {
  return celsiusToKelvin(fahrenheitToCelsius(val));
}

export function kelvinToCelsius(val) {
  return val - 273.15;
}

export function kelvinToFahrenheit(val) {
  return celsiusToFahrenheit(kelvinToCelsius(val));
}
