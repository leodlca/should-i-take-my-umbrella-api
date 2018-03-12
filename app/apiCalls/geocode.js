
const axios = require('axios');
const config = require('../config/config');

function geocodeAddress(address) {

    return new Promise((resolve, reject) => {

        const encodedAddress = encodeURIComponent(address);

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=
                  ${encodedAddress}&key=${config.GMAPS_API_KEY}`)
        .then(res => {

            res = res.data;
            const location = res.results[0].geometry.location;
            const address = res.results[0].formatted_address;

            resolve({
                address,
                location
            });

        }).catch(err => {

            reject('Unable to connect to google servers.');

        });

    });

}

module.exports = {
    geocodeAddress
}