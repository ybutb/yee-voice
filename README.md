Server for yeelight bulb devices control using Pocket sphinx voice recognition.

1. Yee bulb MAC and IP should be set in config/config.json. Voice commands might be checked under 'voiceControl' key.
2. Run `npm run run`
3. To set up voice recognition see: https://github.com/cmusphinx/pocketsphinx.
Existing vocabulary could be found at config/pocketphinx/commands.txt

4. You may use docker to set up the environment locally using commands:
 `make docker-build-dev` to build the image locally on x86 
 and `make run-dev` to run the container afterwards. 

5. Or for Raspberry PI use `make docker-build-prod` to build the image for Raspberry PI 3 
 and `make run` to run the container afterwards.
 
6. To increase recognition accuracy please check the `micDevice` properties in config to be in compliance
with your microphone parameters.

7. Recommended rate for included accoustic recognition model is 16000 Hz and 1 channel.