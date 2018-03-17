const express = require('express');

const CoreController = require('./controllers/core');

function router(app) {

    const v1router = express.Router();

    const coreRouter = express.Router();

    v1router.use('/core', coreRouter);

    coreRouter.get('/should-i-address/:address/:xHours', CoreController.addressShouldI);
    coreRouter.get('/should-i-latlng/:lat/:lng/:xHours', CoreController.latlngShouldI)

    app.use('/v1', v1router);

}

module.exports = {
    router
}

