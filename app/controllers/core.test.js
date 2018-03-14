
const core = require('./core');
const config = require('../config/config');
const mockData = require('../../mockData');

describe('#core.js testing', () => {

    test('function getCurrentIconAndSummary', () => {
        const FINAL_RES = core.getCurrentIconAndSummary(mockData.getForecastCurrentSmall());

        expect(typeof FINAL_RES).toEqual('object');
        expect(core.getCurrentIconAndSummary(mockData.getForecastCurrentSmall())).toEqual({icon: 'clear-day', summary: 'Úmido'});
    });

    test('function getHourlyIconAndSummary', () => {
        const FINAL_RES = core.getHourlyIconAndSummary(mockData.getForecastCurrentSmall());

        expect(typeof FINAL_RES).toEqual('object');
        expect(core.getHourlyIconAndSummary(mockData.getForecastCurrentSmall())).toEqual({icon: 'partly-cloudy-night', summary: 'Úmido durante todo o dia e nublado começa durante a tarde de hoje.'});
    });

    test('function getCurrentPrecipProbability', () => {
        const FINAL_RES = core.getCurrentPrecipProbability(mockData.getForecastCurrentSmall());

        expect(typeof FINAL_RES).toEqual('number');
        expect(FINAL_RES).toEqual(mockData.getForecastCurrentSmall().currently.precipProbability);
    });

    test('function getNextXHoursPrecipProbability', () => {
        const FINAL_RES = core.getNextXHoursPrecipProbability(mockData.getForecastCurrentSmall(), config.DEFAULT_X_HOURS);

        let xHours = config.DEFAULT_X_HOURS;
        let hourlyData = mockData.getForecastCurrentSmall().hourly.data.slice(1);
        let average = 0;
        let result = 0;
        for(let i = 0; i < xHours; i++) {
            average += hourlyData[i].precipProbability;
        }
        result = average / xHours;

        expect(typeof FINAL_RES).toEqual('number');
        expect(FINAL_RES).toEqual(result);
    });

    test('function getAveragePrecipProbability; current < 0.65', () => {
        const FINAL_RES = core.getAveragePrecipProbability(mockData.getForecastCurrentSmall(), config.DEFAULT_X_HOURS);

        const current = core.getCurrentPrecipProbability(mockData.getForecastCurrentSmall());
        const next = core.getNextXHoursPrecipProbability(mockData.getForecastCurrentSmall(), config.DEFAULT_X_HOURS);
        let result = 0;

        if(current > config.CURRENT_LIMIT) {
            result = (current * 2.5 + next) / (config.CURRENT_WEIGHT + 1.0);
        } else {
            result = (current * 1.25 + next) / (config.NEXT_WEIGHT + 1.0);
        }

        expect(typeof FINAL_RES).toEqual('number');
        expect(FINAL_RES).toEqual(result);
    });

    test('function getAveragePrecipProbability; current > 0.65', () => {
        const FINAL_RES = core.getAveragePrecipProbability(mockData.getForecastCurrentGreat(), config.DEFAULT_X_HOURS);

        const current = core.getCurrentPrecipProbability(mockData.getForecastCurrentGreat());
        const next = core.getNextXHoursPrecipProbability(mockData.getForecastCurrentGreat(), config.DEFAULT_X_HOURS);
        let result = 0;

        if(current > config.CURRENT_LIMIT) {
            result = (current * 2.5 + next) / (config.CURRENT_WEIGHT + 1.0);
        } else {
            result = (current * config.NEXT_WEIGHT + next) / (config.NEXT_WEIGHT + 1.0);
        }

        expect(typeof FINAL_RES).toEqual('number');
        expect(FINAL_RES).toEqual(result);
    });

});
