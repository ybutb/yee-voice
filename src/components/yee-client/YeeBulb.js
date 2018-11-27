/**
 * Yeelight bulb methods component.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */
const YeelightSearch = require('yeelight-wifi');
const config  = require("../../../config/config.json");
const logger  = require("../../logger");

class YeeBulb {

	/**
	 * Yee device search client.
	 *
	 * @type {YeelightSearch}
	 */
	search;

	/**
	 * @type {Yeelight}
	 */
	bulbInstance;

	/**
	 * @type boolean
	 */
	error = false;

	/**
	 * Constructor.
	 *
	 * @returns {Promise}
	 */
	constructor(deviceId) {
		console.log("Initializing yee bulb with id: " + deviceId);
		this.search = new YeelightSearch();

		let deviceData = {};
		let devices = config.yeeClient.bulbs;

		for (let key in devices) {
			if (devices[key]["ID"] = deviceId) {
				console.log("Found bulb with id: " + deviceId);
				deviceData = devices[key];

				this.search.addLight(deviceData);
				this.bulbInstance = this.search.getYeelightById(deviceData["ID"]);

				if (!this.bulbInstance) {
					console.log("Failed to find bulb with provided id!");
				}

				break;
			}
		}
	}

	/**
	 *
	 */
	setDeviceOn = () => {
		this.bulbInstance.turnOn().catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceOff = () => {
		this.bulbInstance.turnOff().catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceBright = () => {
		this.bulbInstance.setBrightness(100).catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceDark = () => {
		this.bulbInstance.setBrightness(10).catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceRed = () => {
		this.bulbInstance.setRGB('#ff0000').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceBlue = () => {
		this.bulbInstance.setRGB('#0000ff').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDevicePink = () => {
		this.bulbInstance.setRGB('#ff66ff').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceOrange = () => {
		this.bulbInstance.setRGB('#ff8000').catch((err) => {
			logger.log(err);
			console.log(err);
		});
	};

	/**
	 *
	 */
	setDeviceYellow = () => {
		this.bulbInstance.setRGB('#ffff00').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceWhite = () => {
		this.bulbInstance.setRGB('#ffffff').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDeviceGreen = () => {
		this.bulbInstance.setRGB('#00ff00').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 *
	 */
	setDevicePurple = () => {
		this.bulbInstance.setRGB('#990099').catch((err) => {
			this.onErrorCallback(err);
		});
	};

	/**
	 * Error handling callback.
	 *
	 * @param error
	 *
	 * @return void
	 */
	onErrorCallback = (error) => {
		logger.log(error);
		console.log('Device connection error: ' + error);
		this.error = true;
	};

	/**
	 * Returns true whether device has some connection errors.
	 *
	 * @return {boolean}
	 */
	hasError = () => {
		return this.error;
	}

}

module.exports = YeeBulb;