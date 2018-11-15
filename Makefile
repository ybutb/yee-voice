imagename=yee-voice
parent_image_arm=resin/raspberrypi3-debian
parent_image_x86=node:6

clean:
	@sudo rm -rf node_modules

install: dev-build-server

docker-build-dev:
	@docker rm -f $(service) > /dev/null 2>&1 || exit 0
	@docker build -t $(imagename) --build-arg parent_image=$(parent_image_x86) .

docker-build-prod:
	@docker rm -f $(service) > /dev/null 2>&1 || exit 0
	@docker build -t --build-arg parent_image=$(parent_image_arm) $(imagename) .

build: docker-build-prod

run-dev:
	@docker-compose up yee-voice-recognition-server-dev

ssh:
	@docker-compose exec yee-voice-recognition-server sh

ssh-dev:
	@docker-compose exec yee-voice-recognition-server-dev sh

rebuild-images:
	@docker-compose -p yee-voice-recognition-server rm && docker-compose -p yee-voice-recognition-server pull && docker-compose -p yee-voice-recognition-server build --no-cache
