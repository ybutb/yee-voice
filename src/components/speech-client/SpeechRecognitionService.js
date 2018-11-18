/**
 * Pocketsphinx voice recognition service class.
 *
 * @package yee-voice
 * @author Ivan Ovcharenko ybutb88@gmail.com
 */

let ps = require('pocketsphinx').ps;
const appConfig = require("./../../../config/config.json");
const logger = require( 'logger' );

const modeldir = appConfig.speechServiceModelDir;

let config = new ps.Decoder.defaultConfig();

config.setString("-hmm", appConfig.projectPath + modeldir + "acoustic");
config.setString("-dict", appConfig.projectPath + modeldir + "3400.dic");
config.setString("-lm", appConfig.projectPath + modeldir + "3400.lm");
config.setBoolean('-remove_noise', false);
config.setBoolean('-remove_silence', false);
config.setInt("-samprate", appConfig.micDevice.rate);

let decoder = new ps.Decoder(config);

class SpeechRecognitionService {

	/**
	 * Recognizes audioData to {Hypothesis} object with recognized string.
	 *
	 * @param rawData Audio buffer raw data.
	 * @returns {Promise}
	 */
	processRawdata(rawData) {
		return new Promise((resolve, reject) => {
			console.log("started recognizing audio...");

			try {
				if (!rawData) {
					console.log('No mic data received');
					resolve();
				}

				decoder.startUtt();
				decoder.processRaw(rawData, false, false);
				decoder.endUtt();

				let result = decoder.hyp();
			}
			catch(err) {
				logger.log(err);
				reject(new Error("Failed to recognize mic input. Error: " + err));
			}

			if (null === result) {
				reject(new Error("Failed to recognize mic input..."));
			}
			logger.log(result);

			resolve(result.hypstr);
		});
	}
}

module.exports = SpeechRecognitionService;