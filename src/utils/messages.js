
const moment = require('moment');

const formatMessage = (username, text, color, playerId) => {

    return {
        username,
        text,
        time: moment().format('h:mm: a'),
        color,
        playerId,
    };
};

module.exports = formatMessage;