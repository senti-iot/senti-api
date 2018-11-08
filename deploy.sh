#!/bin/bash

rsync -a --quiet ./ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api
ssh deploy@organa.webhouse.net 'sudo /srv/nodejs/api-restart.sh'
