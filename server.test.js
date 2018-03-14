
const request = require('supertest');

const app = require('./server').app;

function checkShouldIAnswer(body, done) {
    expect(body).toHaveProperty("averagePrecipProbability");
    expect(body.currently).toHaveProperty("icon");
    expect(body.currently).toHaveProperty("summary");
    expect(body.hourly).toHaveProperty("icon");
    expect(body.hourly).toHaveProperty("summary");

    done();
}

describe('#server.js testing', () => {

    describe('/v1/core/should-i/:address', () => {

        test('00000 should get google maps error', (done) => {
            request(app).get('/v1/core/should-i/00000').then(res => {
                expect(res.body.error).toEqual('Unable to connect to google servers.');
                expect(res.statusCode).toBe(500);
                done();
            });
        });

        test('zipcode should get right answer', (done) => {
            request(app).get('/v1/core/should-i/20030030').then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });

        test('address should get right answer', (done) => {
            const address = encodeURI('Rua Dickson Rodrigues, 49, Guarujá, SP');
            request(app).get(`/v1/core/should-i/${address}`).then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });
        
    });

});

