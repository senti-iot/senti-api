#!/bin/bash
# chmod 700 api-restart.sh

if [[ "$1" == "master" ]]; then 
	npm install --prefix /srv/nodejs/senti/senti-api
	systemctl restart senti-api.service
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti API MASTER updated and restarted!"}' https://hooks.slack.com/services/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
	echo
	exit 0
fi

if [[ "$1" == "dev" ]]; then 
	npm install --prefix /srv/nodejs/senti/senti-api-dev
	systemctl restart senti-api-dev.service
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti API DEV updated and restarted!"}' https://hooks.slack.com/services/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
	echo
	exit 0
fi

exit 0


