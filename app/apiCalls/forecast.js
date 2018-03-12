
const axios = require('axios');

const config = require('../config/config');

function getData(lat, lng, address) {

    return new Promise((resolve, reject) => {

        axios.get(`https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/${lat},${lng}?exclude=minutely,daily,flags&lang=pt&units=auto`)
        .then(res => {
            resolve(res.data);
        }).catch(err => {
            reject('Unable to fetch wheater.');
        });

    });

}

module.exports = {
    getData
}