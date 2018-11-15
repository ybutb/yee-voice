Server for yeelight bulb devices control using Pocket sphinx voice recognition.

1. Yee bulb MAC and IP should be set in config/config.json. Voice commands might be checked under 'voiceControl' key.
2. Run `npm run run`
3. To set up voice recognition see: https://github.com/cmusphinx/pocketsphinx.
Existing vocabulary could be found at config/pocketphinx/commands.txt

4. You may use docker to set up the environment using commands:
 `make docker-build-dev` to build the image locally on x86 
 and `make dev-run` to run the container afterwards.
 
 OR 

 `make docker-build-prod` to build the image locally on Raspberry PI 3 
 and `make run` to run the container afterwards.