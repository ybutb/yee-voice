/**
 * Microphone output class.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */

const MicToSpeech = require('mic-to-speech');

class MicService {
	rawDataHandlingCallback = null;

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
		this.micInstance = new MicToSpeech({debug: false, channels: 1, sampleRateHertz: 16000});

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
	 *
	 */
	resumeMic() {
		console.log('Resuming microphone...');
		this.micInstance.resume();
	}
}

module.exports = MicService;