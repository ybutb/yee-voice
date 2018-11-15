/**
 * Puts logs to the text file.
 *
 * @package tg-service
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */

'use strict';
const fs = require('fs');
let config = require('./../config/config.json');

const logger = () => {
    let pub = {};

    const path = config.logPath;

    pub.log = (message) => {
        let currentTime = Date.now();

        fs.appendFile(path, '[' + currentTime + '] ' + JSON.stringify(message) + "\n", function (err) {
            if (err) console.log(err);
        });
    };

    return pub;
};

module.exports = logger();