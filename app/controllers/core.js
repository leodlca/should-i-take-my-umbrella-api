
const geocode = require('../apiCalls/geocode');
const forecast = require('../apiCalls/forecast');
const friendlyMessages = require('../utils/friendlyMessages');
const config = require('../config/config');

function addressShouldI(req, response, next) {
    const address = req.params.address;
    const xHours = req.params.xHours;

    geocode.geocodeAddress(address).then(res => {

        return forecast.getData(res.location.lat, res.location.lng, res.address);

    }).then(res => {

        const averagePrecipProbability = getAveragePrecipProbability(res, config.DEFAULT_X_HOURS).toFixed(config.TO_FIXED);

        response.status(200).json({
            averagePrecipProbability: averagePrecipProbability,
            currently: getCurrentIconAndSummary(res),
            hourly: getHourlyIconAndSummary(res),
            friendlyMessage: friendlyMessages.getRandom(averagePrecipProbability),
            temperature: getCurrentTemperature(res)
        });

    }).catch(err => {
        response.status(500).json({
            error: err
        });

    });
}

function latlngShouldI(req, response, next) {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const xHours = req.params.xHours;

    forecast.getData(lat, lng, '').then(res => {

        const averagePrecipProbability = getAveragePrecipProbability(res, xHours).toFixed(config.TO_FIXED);

        response.status(200).json({
            averagePrecipProbability: averagePrecipProbability,
            currently: getCurrentIconAndSummary(res),
            hourly: getHourlyIconAndSummary(res),
            friendlyMessage: friendlyMessages.getRandom(averagePrecipProbability),
            temperature: getCurrentTemperature(res)
        });

    }).catch(err => {
        response.status(500).json({
            error: err
        });

    });
}

function getCurrentIconAndSummary(data) {
    return {
        icon: data.currently.icon,
        summary: data.currently.summary
    };
}

function getHourlyIconAndSummary(data) {
    return {
        icon: data.hourly.icon,
        summary: data.hourly.summary
    };
}

function getCurrentPrecipProbability(data) {
    return data.currently.precipProbability;
}

function getNextXHoursPrecipProbability(data, xHours) {
    let hourlyData = data.hourly.data.slice(1);
    let average = 0;
    for(let i = 0; i < xHours; i++) {
        average += hourlyData[i].precipProbability;
    }
    return average / xHours;
}

function getAveragePrecipProbability(data, xHours) {

    const current = getCurrentPrecipProbability(data);
    const next = getNextXHoursPrecipProbability(data, xHours);

    if(current > config.CURRENT_LIMIT) {
        return (current * config.CURRENT_WEIGHT + next) / (config.CURRENT_WEIGHT + 1.0);
    } else {
        return (current * config.NEXT_WEIGHT + next) / (config.NEXT_WEIGHT + 1.0);
    }
    
}

function getCurrentTemperature(data) {
    return data.currently.temperature;
}

module.exports = {
    addressShouldI,
    latlngShouldI,
    getCurrentIconAndSummary,
    getHourlyIconAndSummary,
    getCurrentPrecipProbability,
    getNextXHoursPrecipProbability,
    getAveragePrecipProbability
}