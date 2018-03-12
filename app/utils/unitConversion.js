
function celsiusToFahr(celsius) {
    return celsius * 1.8 + 32;
}

function fahrToCelsius(fahr) {
    return (fahr - 32) / 1.8;
}

module.exports = {
    fahrToCelsius,
    celsiusToFahr
}