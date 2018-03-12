
const geocode = require('../apiCalls/geocode');
const forecast = require('../apiCalls/forecast');
const friendlyMessages = require('../utils/friendlyMessages');
const config = require('../config/config');

function shouldI(req, response, next) {
    const address = req.params.address;

    geocode.geocodeAddress(address).then(res => {

        return forecast.getData(res.location.lat, res.location.lng, res.address);

    }).then(res => {

        const averagePrecipProbability = getAveragePrecipProbability(res, config.DEFAULT_X_HOURS);

        response.status(200).json({
            averagePrecipProbability: averagePrecipProbability,
            currently: getCurrentIconAndSummary(res),
            hourly: getHourlyIconAndSummary(res),
            friendlyMessage: friendlyMessages.getRandom(averagePrecipProbability)
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
    return ((getCurrentPrecipProbability(data) * 2.0) + getNextXHoursPrecipProbability(data, xHours)) / 3.0;
}

module.exports = {
    shouldI
}