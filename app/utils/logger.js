
const fs = require('fs');

function logger(req, res, next) {

    const now = new Date();
    const hours = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours().toString();
    const minutes = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes().toString();
    const log = `[${hours}:${minutes}] ==> ${req.method} "${req.url}"`

    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();

}

module.exports = {
    logger
}