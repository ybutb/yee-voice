/**
 * Controller for controlling yee bulb by voice.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */

const yeeClient       = require('../components/yee-client/YeeClient');
const mic             = require('../components/mic/MicService');
const SpeechRecognitionService = require('../components/speech-client/SpeechRecognitionService');

class YeeController {
	micService = null;
	yeeClient  = null;
	speechRecognitionService = null;


	/**
	 * Initializes controller.
	 *
	 * @return void
	 */
	init() {
		this.yeeClient  = new yeeClient();
		this.speechRecognitionService = new SpeechRecognitionService();
		this.micService = new mic(this.rawSpeechEvent.bind(this));
	}

	/**
	 * Event to be triggered on mic stream received.
	 *
	 * @param audioBuffer
	 */
	rawSpeechEvent(audioBuffer) {
		this.speechRecognitionService.processRawdata(audioBuffer)
			.then(this.validateRecognizedResult.bind(this))
			.catch((e) => {
			console.log(e);
			this.micService.resumeMic();
		});
	}

	/**
	 * Validates recognized command.
	 *
	 * @param {string} command
	 *
	 * @returns {boolean}
	 */
	validateRecognizedResult(command) {
		console.log("Recognized command: " + command);

		if (command === null || command === "undefined") {
			console.log("Invalid command parameter: " + command);
			return false;
		}

		command = command.toLowerCase();
		//
		// if (!command.includes(config.voiceControl.keyWord)) {
		// 	console.log("Keyword '" + config.voiceControl.keyWord + "' was not found in the recognized command. Ignoring...");
		// 	this.micService.resumeMic();
		//
		// 	return false;
		// }

		this.micService.resumeMic();
		return this.yeeClient.processCommand(command);
	}
}

module.exports = new YeeController();