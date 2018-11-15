/**
 * Yeelight bulb methods component.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */
const YeelightSearch = require('yeelight-wifi');
const config  = require("../../../config/config.json");

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
		this.bulbInstance.turnOn();
	};

	/**
	 *
	 */
	setDeviceOff = () => {
		this.bulbInstance.turnOff();
	};

	/**
	 *
	 */
	setDeviceBright = () => {
		this.bulbInstance.setBrightness(100);
	};

	/**
	 *
	 */
	setDeviceDark = () => {
		this.bulbInstance.setBrightness(10);
	};

	/**
	 *
	 */
	setDeviceRed = () => {
		this.bulbInstance.setRGB('#ff0000');
	}

	/**
	 *
	 */
	setDeviceBlue = () => {
		this.bulbInstance.setRGB('#0000ff');
	}

	/**
	 *
	 */
	setDevicePink = () => {
		this.bulbInstance.setRGB('#ff66ff');
	}

	/**
	 *
	 */
	setDeviceOrange = () => {
		this.bulbInstance.setRGB('#ff8000');
	}

	/**
	 *
	 */
	setDeviceYellow = () => {
		this.bulbInstance.setRGB('#ffff00');
	}

	/**
	 *
	 */
	setDeviceWhite = () => {
		this.bulbInstance.setRGB('#ffffff');
	}

	/**
	 *
	 */
	setDeviceGreen = () => {
		this.bulbInstance.setRGB('#00ff00');
	}

	/**
	 *
	 */
	setDevicePurple = () => {
		this.bulbInstance.setRGB('#990099');
	}

}

module.exports = YeeBulb;