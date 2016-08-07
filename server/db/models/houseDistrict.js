'use strict';

const Sequelize = require('sequelize'),
      db = require('../_db');

let getOrdinalString = function(num) {
    let string = num.toString();
    let suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'],
        lastDigit = string[string.length - 1];
    string += suffixes[lastDigit];
    return string;
};

module.exports = db.define('houseDistrict', {
    number: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        },
        get: function() {
            let num = this.getDataValue('number');
            return getOrdinalString(num);
        }
    }
});
