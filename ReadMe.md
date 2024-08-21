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

## Flyway and testdatabase

```
sudo docker-compose start t1000flyway
```

```
sudo docker-compose run -e FLYWAY_COMMAND=info t1000flyway
```

## Project
https://www.php.net/manual/en/session.idpassing.php

Session cookies fall under the categorization of strictly necessary cookies under the General Data Protection Regulation (GDPR), applicable in the European Union and the UK. Strictly necessary cookies like session cookies are exempt from the consent requirements underlined in the GDPR. Therefore, session cookies are GDPR compliant. 



  https://profinit.eu/en/blog/build-once-deploy-many-in-react-dynamic-configuration-properties/

    <script src="%PUBLIC_URL%/config.json"></script>
    <script>
      window.config = { baseUrl };
    </script>

      "homepage": "https://www.philippfonteyn.de/hindi",


https://www.gnu.org/gnu/linux-and-gnu.html
linux and kernel?

# TODO
	-functional
	    - loading wheels
		- import/export
	    - woerter fuer kathrin laden
		- second style iphone/android (buttons am boden)
		- box counter display
	    - logout are you sure?
	    - list all cards
	    	- with pagination
		    - all cards search box
		    - all cards dropbox, collection
		- sound positive and negative feedback, plus mute option
		- self registration
		- manage languages

	-nonfunctional
		- router benutzen
		- how to design for iphone?
	    - toncifg as resource -> test!
	    - bundle version at build time
	    - set homepage in package, based on production or dev build...??
		- rename frontend
		- use license
		- include frontend in docker-compose
		- OPTIONS request shoud include cookie (else backend has to start new session every time)
		- connect with github
		- switch to typescript
		- skip function test; nocard left;
	    - password hash and save
	    - seperate cards into languages
		- OPTIONS request shoud include cookie (else backend has to start new session every time)
		- cookie lifetime
		- postmancollection / restapi tests
		- php junittests?
		- react build into nginx....
		- use prettier, lint and other typescript essentials
		- api documentation and swagger
		- setup a ci/cd for frontend pipeline and backendpipeline 

## Functions
	- five bins
	- nice and simple frontend
	- promote / demote vocabluary
	- add/edit vocabulary
	- multiple users + language
	- test unicode symbols in database...