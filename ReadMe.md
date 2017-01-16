# Web Application

The Web Application allows the coaching staff of the University of Akron Women's Swim Team to view and analyze data from the S.W.I.M. data system.

Features Include:

  - Charting with Chart.JS
  - Event Driven Interface
  - Ability to add new users to the RFID tag system
  - Data export to .csv

# Installation
Clone or Download the Repo.

If you don't have node installed on your machine, follow the instructions here: https://nodejs.org/en/

Once you have node installed, download Grunt. Grunt can execute different Javascript files, which you'll need to compile our code.
```sh
$ npm install -g grunt-cli
```
The -g means you can run grunt from anywhere on your machine.  You should read more about Grunt here, it's cool: http://gruntjs.com/

Once you have grunt installed, you'll need to install all the libraries and dependencies our applicaiton uses.  If you want access to the full development suite run the following command:
```sh
$ grunt-init-dev
```
otherwise just run 
```sh
$ grunt-init-dev
```
and you'll be good to go.

If you want to see what exactly these tasks are doing, check out Gruntfile.js.  You'll see a bunch of other commands in there that do other things for our Application.  A list of the most helpful commands will be added soon.
