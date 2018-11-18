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

	/**
     * Logs message to error log.
     *
	 * @param message
     *
     * @return void
	 */
	pub.log = (message) => {
		if (!fs.existsSync(path)) {
			createLogFile().then((result) => writeToLogFile(message));
			return;
		}

		writeToLogFile(message);
    };

	/**
     * Writes message to log file.
     *
	 * @param {string} message
     *
     * @return void
	 */
	const writeToLogFile = (message) => {
		fs.appendFile(path, '[' + currentTime + '] ' + JSON.stringify(message) + "\n", function (err) {
			if (err) {
				console.log(err);
				reject(err);
			}
		});
    };

	/**
     * Creates logs file and directory.
     *
     * @return {Promise}
	 */
	const createLogFile = () => {
        return new Promise((resolve, reject) => {
            const logFilePath = '../' + config.logPath;

	        fs.writeFile(logFilePath, '', (err) => {
	            const errorMessage = "Error occured during creating of log file. File path: " + logFilePath;

		        if (err)  {
			        console.log(errorMessage);
			        return reject(errorMessage);
		        }

		        return resolve();
	        });
        });
    };

    return pub;
};

module.exports = logger();