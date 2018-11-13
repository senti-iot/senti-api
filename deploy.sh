#!/bin/bash

echo
echo Deploying Senti API $1 ... 
rsync -r --quiet $2/ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api-dev
echo
echo Restarting Senti API $1 service ... 
ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/api-restart.sh dev'
echo
echo Deployment done!
