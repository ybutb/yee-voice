/**
 * Yeelight api client class.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */
const config  = require("../../../config/config.json");
const YeeBulb = require('./YeeBulb');

class YeeClient {

	/**
	 *
	 * @type Array[{YeeBulb}]
	 */
	devices = [];

	/**
	 * Constructor.
	 *
	 * @returns {Promise}
	 */
	constructor() {
		console.log("Initializing yee client...");
	}

	/**
	 * Searches for device key mentioned in command and performs action on it.
	 *
	 * @param {string} command
	 */
	processCommand(command) {

		let deviceMapping = config.yeeClient.keywordIdMap;
		console.log('searching for the device at: ' + deviceMapping);

		for (let deviceKeyword in deviceMapping) {
			console.log("device keyword: " + deviceKeyword);
			console.log("command: " + command);

			if (typeof deviceKeyword === 'string' && command.indexOf(deviceKeyword) !== -1) {
				console.log("Device was found: " + deviceKeyword);

				let device         = this.getDeviceByKeyword(deviceKeyword);
				let deviceCallback = this.getFunctionByCommand(device, command);

				if (!deviceCallback) {
					console.log("Failed to find proper action for the device!");
					return;
				}

				deviceCallback();
			}
		}
	}

	/**
	 * Returns initialized device from stack by mapped keyword.
	 *
	 * @param keyword
	 * @return {*}
	 */
	getDeviceByKeyword(keyword) {
		let deviceMapping = config.yeeClient.keywordIdMap;

		if (!this.devices.hasOwnProperty(keyword) || this.devices[keyword].hasError()) {
			this.devices[keyword] = new YeeBulb(deviceMapping[keyword]);
		}

		return this.devices[keyword];
	}

	/**
	 * Returns callback which was mapped to the provided command's keyword.
	 *
	 * @param {YeeBulbComponent} device
	 * @param {string} command
	 *
	 * @return {string}
	 */
	getFunctionByCommand(device, command) {
		let functionMapping = config.yeeClient.keywordFunctionMap;

		for (let keyword in functionMapping) {
			console.log('Keyword ' + keyword);
			console.log('Command ' + command);

			if (command.indexOf(keyword) !== -1) {
				console.log('recognized keyword ' + command);

				if (typeof device[functionMapping[keyword]] === 'function') {
					return device[functionMapping[keyword]];
				}
			}
		}
	}
}

module.exports = YeeClient;