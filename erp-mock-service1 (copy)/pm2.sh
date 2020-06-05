#!/bin/sh

#nginx conf - not required so commenting out.
#service nginx start -d


#deployment
cd /root/nodejs-template-service/
npx pm2 delete all
npx pm2 start scripts/api/template-service --update-env

#Not Sleep
sleep infinity
