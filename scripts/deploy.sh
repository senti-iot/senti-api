#!/bin/bash

rsync -r --quiet $TRAVIS_BUILD_DIR/ deploy@organa.webhouse.net:/srv/nodejs/senti/senti-api
sudo /srv/nodejs/api-restart.sh
