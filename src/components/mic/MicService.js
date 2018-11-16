/**
 * Microphone output class.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */

const MicToSpeech = require('mic-to-speech');
const config  = require("../../../config/config.json");

class MicService {

	/**
	 * Callback to handle microphone 'speech' event.
	 *
	 * @type {callback}
	 */
	rawDataHandlingCallback = null;

	/**
	 * Microphone instance.
	 *
	 * @type {SpeechExtractor}
	 */
	micInstance = null;

	/**
	 * Constructor.
	 *
	 * @param rawDataHandlingCallback
	 * @return {MicService}
	 */
	constructor(rawDataHandlingCallback) {
		this.rawDataHandlingCallback = rawDataHandlingCallback;
		this.init();

		return this;
	}

	/**
	 * Initializes microphone and binds events.
	 *
	 * @return void
	 */
	init() {
		let micSettings = {
			sampleRateHertz: Math.floor(config.micDevice.rate),
			channels: config.micDevice.channels,
			device: config.micDevice.name
		};

		this.micInstance = new MicToSpeech(micSettings);

		console.log("initializing microphone");

		this.micInstance.on('speech', (rawAudio) => {
			console.log("onspeech event triggered");
			this.micInstance.pause();

			return this.rawDataHandlingCallback(rawAudio);
		});

		this.micInstance.start();
		console.log("Started to listen microphone.");
	}

	/**
	 * Resumes microphone to continue listen the environment.
	 *
	 * @return void
	 */
	resumeMic() {
		console.log('Resuming microphone...');
		this.micInstance.resume();
	}
}

module.exports = MicService;