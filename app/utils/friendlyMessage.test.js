const friendlyMessages = require('./friendlyMessages');

describe('#friendlyMessages.js testing', () => {

    test('function getRandom from 0.00 to 1.00', () => {
        for(let i = 0; i < 1.00; i += 0.01) {
            expect(typeof friendlyMessages.getRandom(i)).toEqual('string');
        }
    });

});