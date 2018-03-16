
const randomNumber = require('./randomNumber');

const between0and9 = [
    'Não, tá liberado! :D',
    'Relaxa, não precisa não! :D',
    'Tá tranquilo, pode ir! :D',
    'Nah, relaxa, pode ir! :)',
    'Noope, tá liberado! :)',
    'Não precisa, pode ir! :)'
];

const between10and19 = [
    'Hmmm... Acho que não precisa.',
    'Pelos meus cálculos, não vejo muita necessidade.',
    'Acho que não tem problema não levar.'
];

const between20and39 = [
    'Ah, se não for incomodar, eu levaria só por segurança.',
    'Meus cálculos dizem que não, mas eu levaria só por precaução.',
];

const between40and59 = [
    'A não ser que vá te incomodar muuuuuito, leva sim.',
    'É melhor levar, nunca se sabe...',
    'Eu levaria por precaução!'
];

const between60and69 = [
    'Leva sim, é melhor',
    'Meus cálculos dizem que tem uma boa chance de chover, leva sim!',
    'Melhor levar hein, risco grande de chuva!'
];

const between70and84 = [
    'Com certeza!',
    'Já devia ter separado!',
    'Leva sim, vai por mim ;)'
];

const between85and100 = [
    'Acho até que já está chovendo, checa aí!',
    'Por favor, leva!',
    'Claro! Já deve até estar chovendo!'
];

function getRandom(percentage) {

    if(percentage <= 0.09) {
        return between0and9[randomNumber.get(0, between0and9.length - 1)];
    } else if(percentage <= 0.19) {
        return between10and19[randomNumber.get(0, between10and19.length - 1)];
    } else if(percentage <= 0.39) {
        return between20and39[randomNumber.get(0, between20and39.length - 1)];
    } else if(percentage <= 0.59) {
        return between40and59[randomNumber.get(0, between40and59.length - 1)];
    } else if(percentage <= 0.69) {
        return between60and69[randomNumber.get(0, between60and69.length - 1)];
    } else if(percentage <= 0.84) {
        return between70and84[randomNumber.get(0, between70and84.length - 1)];
    } else {
        return between85and100[randomNumber.get(0, between85and100.length - 1)];
    }

}

module.exports = {
    getRandom
}
