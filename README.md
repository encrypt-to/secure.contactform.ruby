# Secure contact form ready for Heroku.

#### _Sinatra app for receiving encrypted PGP messages on [Heroku](http://heroku.com)._

## Demo

[https://encrypt.herokuapp.com/](https://encrypt.herokuapp.com/)

## Installation

Install the gems

	$ bundle install

Run the app locally

	$ shotgun config.ru

Your app should then be running at `http://localhost:9393`.

## PGP Config

Open the **views/contact.erb** file and replace in line 17 **-----BEGIN PGP PUBLIC KEY BLOCK-----** with your public PGP key.

Open the **app.rb** file and replace in line 7 **your@email.com** with your email.

## Heroku App Creation

Heroku relies on [Git](http://devcenter.heroku.com/articles/git) for deploying apps so initialize git for the app.

	$ git init
	$ git add .
	$ git commit -m "Initial Commit"

To create a Heroku app, first be sure you are [signed up](https://api.heroku.com/signup). Then type the following in Terminal while inside of the project directory.

	$ heroku create NAME_OF_YOUR_APP

Heroku allows you to use the Sendgrid addon to send emails. You can sign up for a free account (up to 200 emails a day) using the following code:

	$ heroku addons:add sendgrid:starter
	
Setup EMAIL_SERVICE with the following command
	
	$ heroku config:add EMAIL_SERVICE=sendgrid.net

Once this returns successfully, push your app to Heroku.

	$ git push heroku master
	
### Changelog

v1.1 Update OpenPGP.js to v0.5.1
v1.0 Release

### MIT License

