# Vocabel T-1000

A simple register for flash cards.

# Development

To start a local developer environment run:

```bash
git checkout ...
cd docker
sudo docker docker-compose up -d
```
and for frontend
```bash
cd voct1000react
npm run start
```

## Project
https://www.php.net/manual/en/session.idpassing.php

Session cookies fall under the categorization of strictly necessary cookies under the General Data Protection Regulation (GDPR), applicable in the European Union and the UK. Strictly necessary cookies like session cookies are exempt from the consent requirements underlined in the GDPR. Therefore, session cookies are GDPR compliant. 


# TODO
	- BACKEND
	- FRONTEND
	- Infrastructure
		- use license
		- include frontend in docker-compose
		- OPTIONS request shoud include cookie (else backend has to start new session every time)
		- connect with github
		- switch to typescript
		- set up rest api (no .php in the end)
		- postmancollection / restapi tests
		- php junittests?
		- sound positive and negative feedback, plus mute option
		- react ui system.... bootstrap oder antd?
		- react build into nginx....
		- use prettier, lint and other typescript essentials
		- api documentation and swagger
		- setup a ci/cd for frontend pipeline and backendpipeline
		- test unicode symbols in database...
	- Functions
		- five bins
		- nice and simple frontend
		- promote / demote vocabluary
		- add/edit vocabulary
		- multiple users + language
