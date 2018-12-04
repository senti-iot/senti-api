#!/bin/bash

if [[ "$1" == "master" ]]; then 
	echo
	echo Deploying Senti API $1 ... 
	rsync -r --quiet $2/ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api
	echo
	echo Restarting Senti API production service ... 
	# ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/api-restart.sh master'
	ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/senti/senti-api/scripts/api-restart.sh master'
	echo
	echo Deployment to production and restart done!
	exit 0
fi 

if [[ "$1" == "dev" ]]; then 
	echo
	echo Deploying Senti API $1 ... 
	rsync -r --quiet $2/ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api-dev
	echo
	echo Restarting Senti API $1 service ... 
	# ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/api-restart.sh dev'
	ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/senti/senti-api-dev/scripts/api-restart.sh dev'
	echo
	echo Deployment to dev and restart done!
	exit 0
fi