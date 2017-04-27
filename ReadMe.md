# Web Application
![alt text][mongoDB] ![alt text][nodeJS] ![alt text][requireJS] ![alt text][UA] <br />

The Web Application allows the coaching staff of the University of Akron Women's Swim Team to view and analyze data from the S.W.I.M. data system.

Features Include:
  - Charting with Chart.JS
  - Event Driven Interface
  - Ability to add new users to the RFID tag system
  - Data export to .csv

### Required Components
You'll want to go get the following:
  - NodeJS
  - Bower
  - MongoDB
  - Grunt

The following sections describes in detail how to get each.  I would clone/download the repo now and setup your working directory.

### NodeJS
If you don't have node installed on your machine, follow the instructions here: https://nodejs.org/en/


### Bower
Once you have npm working on your machine, install Bower for front-end package management.
```sh
$ npm install bower --g
```
The -g means you can run the package from anywhere on your machine.  

### MongoDB
MongoDB is used to contain information from the swimmer's workout.  You'll want to install MongoDB according to your systems specifications at: http://www.mongodb.org/downloads

Don't forget to add the following directory at the root of your machine:

```sh
$ mkdir /data/db
```
Mongo places its data at that location by default, and it won't start without that directory present.

You shouldn't need to change any of the application defaults.  You'll need to make 3 different collections from the json files included in database/
 - swimmers (use swimmers.json) 
 - workouts (no specific json is provided but you should follow the schema defined in database/workout_dbmodel.js)
  - recent_workouts (same as workouts, but make this a capped collection)

### Grunt
Once you have node installed, download Grunt. Grunt can execute different Javascript files.  We use Grunt for testing, and compilation.

```sh
$ npm install -g grunt-cli
```

Run this as sudo if your machine fails.  You can read more about Grunt here, it's cool: http://gruntjs.com/

### Initial Setup
Once you have grunt installed, you'll need to install all the libraries and dependencies our server needs. Because this runs through node, you install them with:

```sh
$ npm install
```
all of of these dependencies are listed in the package.json file.  There's a separate section for development dependencies.

Similarly for the front-end components you'll need to run: 

```sh
$ bower install
```
Just like the package.json file, there is a bower.json file. These dependencies are installed in public/scripts/vendor.
 
### Launching the Server
The grunt command 
```sh
$ grunt devmode
```
launches a node server in debug mode with nodemon active.  Navigate to 
```sh
localhost:3300 
```
to see hompage of the application. If you want to see what exactly these tasks are doing, check out Gruntfile.js.  You'll see a bunch of other commands in there that do other things for our Application.
 Checkout the routes folder to see what server endpoints exist.

# Notes
This product was developed for The University of Akron Electrical and Computer Engineering Department's Senior Design course.

[nodeJS]: https://www.shareicon.net/data/128x128/2015/10/06/112725_development_512x512.png "nodeJS"
[mongoDB]: https://perlmaven.com/img/mongodb-logo.png "mongoDB"
[requireJS]: http://esa-matti.suuronen.org/images/browserify/requirejs-logo.png "requireJs"
[UA]: https://static.yocket.in/images/universities/logos/akron_university_logo.jpg "The University of Akron"
