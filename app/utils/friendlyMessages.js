
const randomNumber = require('./randomNumber');

const between0and9 = [
    'Não, tá liberado! :D',
    'Relaxa, não precisa não! :D',
    'Tá tranquilo, pode ir! :D'
];

const between10and19 = [
    'Nah, relaxa, pode ir! :)',
    'Noope, tá liberado! :)',
    'Não precisa, pode ir! :)'
];

const between20and29 = [
    'Hmmm... Acho que não precisa.',
    'Pelos meus cálculos, não vejo muita necessidade.',
    'Acho que não tem problema não levar.'
];

const between30and49 = [
    'Ah, se não for incomodar, eu levaria só por segurança.',
    'Meus cálculos dizem que não, mas eu levaria só por precaução.',
];

const between50and59 = [
    'A não ser que vá te incomodar muuuuuito, leva sim.',
    'É melhor levar, nunca se sabe...',
    'Eu levaria por precaução!'
];

const between60and79 = [
    'Leva sim, é melhor',
    'Meus cálculos dizem que tem uma boa chance de chover, leva sim!',
    'Melhor levar hein, risco grande de chuva!'
];

const between80and89 = [
    'Claro, que pergunta!',
    'Já devia ter separado!',
    'A não ser que você queira voltar molhado, leva sim!'
];

const between90and100 = [
    'Que pergunta! Acho que até já está chovendo, checa aí!',
    'A não ser que você queira pegar uma gripe, leva!!',
    'Claro! Até já deve estar chovendo!'
];

function getRandom(percentage) {

    if(percentage <= 0.09) {
        return between0and9[randomNumber.get(0, between0and9.length)];
    } else if(percentage <= 0.19) {
        return between10and19[randomNumber.get(0, between10and19.length)];
    } else if(percentage <= 0.29) {
        return between20and29[randomNumber.get(0, between20and29.length)];
    } else if(percentage <= 0.49) {
        return between30and49[randomNumber.get(0, between30and49.length)];
    } else if(percentage <= 0.59) {
        return between50and59[randomNumber.get(0, between50and59.length)];
    } else if(percentage <= 0.79) {
        return between60and79[randomNumber.get(0, between60and79.length)];
    } else if(percentage <= 0.89) {
        return between80and89[randomNumber.get(0, between80and89.length)];
    } else {
        return between90and100[randomNumber.get(0, between90and100.length)];
    }

}

module.exports = {
    getRandom
}
