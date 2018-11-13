#!/bin/bash
# chmod 700 api-restart.sh

if [[ "$1" == "master" ]]; then 
	npm install --prefix /srv/nodejs/senti/senti-api
	systemctl restart senti-api.service
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti API on PRODUCTION updated and restarted!"}' https://hooks.slack.com/services/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
	echo
	exit 0
fi

if [[ "$1" == "dev" ]]; then 
	npm install --prefix /srv/nodejs/senti/senti-api-dev
	systemctl restart senti-api-dev.service
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti API on DEV updated and restarted!"}' https://hooks.slack.com/services/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
	echo
	exit 0
fi

exit 0
