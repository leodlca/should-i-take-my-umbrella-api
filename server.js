
const express = require('express');
const cors = require('cors');

const routes = require('./app/routes');
const config = require('./app/config/config');
const logger = require('./app/utils/logger');
const geocode = require('./app/apiCalls/geocode');
const forecast = require('./app/apiCalls/forecast');

const app = express();

const PORT = process.env.PORT || config.SERVER_PORT;

app.use(logger.logger);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});

routes.router(app);

module.exports = {
    app
}
