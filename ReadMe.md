# Web Application
![alt text][mongoDB] ![alt text][nodeJS] ![alt text][requireJS] ![alt text][handlebars] ![alt text][UA] <br />

The Web Application allows the coaching staff of the University of Akron Women's Swim Team to view and analyze data from the S.W.I.M. data system.

Features Include:
  - Charting with Chart.JS
  - Event Driven Interface
  - Ability to add new users to the RFID tag system
  - Data export to .csv

### Node Installation
Clone or Download the Repo to your desired directory. 
If you don't have node installed on your machine, follow the instructions here: https://nodejs.org/en/

### MongoDB
MongoDB is used to contain information from the swimmer's workout.  You'll want to install MongoDB according to your systems specifications at: http://www.mongodb.org/downloads

You shouldn't need to change any of the defaults as our application currently runs locally.  If you don't have a database ready to pull from, don't worry, Grunt will handle that for us.

### Grunt
Once you have node installed, download Grunt. Grunt can execute different Javascript files.  We use Grunt for testing, compilation, and for an initial install of our project.
```sh
$ npm install -g grunt-cli
```
The -g means you can run grunt from anywhere on your machine.  You should read more about Grunt here, it's cool: http://gruntjs.com/

### Initial Setup
Once you have grunt installed, you'll need to install all the libraries and dependencies our application uses. Start off with the application's node dependencies:
```sh
$ npm install
```
We can use grunt for the rest.  To access to the full development suite: 
```sh
$ grunt-init-database
$ grunt-init-dev
```
The first task sets you up with a database full of dummy information.  This requires python to be installed on your system, so if you experience a failure, that is why.  The second installs all the dependencies in our bower.json file, as well as compiles some code and runs some tests.  Feel free to skip the database step if you have your own dataset to work with.  

If you want to see what exactly these tasks are doing, check out Gruntfile.js.  You'll see a bunch of other commands in there that do other things for our Application.  A list of the most helpful commands will be added soon.

### Launching the Server
The grunt command 
```sh
$ grunt-devmode
```
launches a node server in debug mode with nodemon active.  Navigate to 
```sh
localhost:3300 
```
to see hompage of the application.  Other options exist at /data or /id. Checkout the routes folder to see what server endpoints exist.

# Notes
This product is still in development, all users must run grunt-init-dev before the application will be usable.

[nodeJS]: https://www.shareicon.net/data/128x128/2015/10/06/112725_development_512x512.png "nodeJS"
[mongoDB]: https://perlmaven.com/img/mongodb-logo.png "mongoDB"
[requireJS]: http://esa-matti.suuronen.org/images/browserify/requirejs-logo.png "requireJs"
[handlebars]: https://andrejunges.gallerycdn.vsassets.io/extensions/andrejunges/handlebars/0.2.0/1477751107534/Microsoft.VisualStudio.Services.Icons.Default "handlebars"
[UA]: https://static.yocket.in/images/universities/logos/akron_university_logo.jpg "The University of Akron"