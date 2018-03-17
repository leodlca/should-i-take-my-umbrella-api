
const request = require('supertest');

const app = require('./server').app;

function checkShouldIAnswer(body, done) {
    expect(body).toHaveProperty('averagePrecipProbability');
    expect(body.currently).toHaveProperty('icon');
    expect(body.currently).toHaveProperty('summary');
    expect(body.hourly).toHaveProperty('icon');
    expect(body.hourly).toHaveProperty('summary');
    expect(body).toHaveProperty('temperature');
    
    done();
}

describe('#server.js testing', () => {

    describe('/v1/core/should-i-address/:address/:xHours', () => {

        test('00000 should get google maps error', (done) => {
            request(app).get('/v1/core/should-i-address/00000/2').then(res => {
                expect(res.body.error).toEqual('Unable to connect to google servers.');
                expect(res.statusCode).toBe(500);
                done();
            });
        });

        test('zipcode should get right answer', (done) => {
            request(app).get('/v1/core/should-i-address/20030030/5').then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });

        test('address should get right answer', (done) => {
            const address = encodeURI('Rua Dickson Rodrigues, 49, Guarujá, SP');
            request(app).get(`/v1/core/should-i-address/${address}/12`).then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });
        
    });

    describe('/v1/core/should-i-latlng/:lat/:lng/:xHours', () => {

        test('invalid lat,lng should get forecast error', (done) => {
            const lat = -9418611;
            const lng = 9651684;
            request(app).get(`/v1/core/should-i-latlng/${lat}/${lng}/2`).then(res => {
                expect(res.body.error).toEqual('Unable to fetch wheater.');
                expect(res.statusCode).toBe(500);
                done();
            });
        });

        test('zipcode should get right answer', (done) => {
            const lat = -22.910016;
            const lng = -43.174815;
            request(app).get(`/v1/core/should-i-latlng/${lat}/${lng}/5`).then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });

        test('address should get right answer', (done) => {
            const lat = 49.275599;
            const lng = -123.052156;
            request(app).get(`/v1/core/should-i-latlng/${lat}/${lng}/12`).then(res => {
                expect(res.statusCode).toBe(200);
                checkShouldIAnswer(res.body, done);
            });
        });
        
    });

});

