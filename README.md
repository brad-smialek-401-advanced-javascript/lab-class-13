# LAB - 13

## Bearer Authorization

### Author: Brad Smialek


### Links and Resources

* [travis]([![Build Status](https://www.travis-ci.com/brad-smialek-401-advanced-javascript/lab-class-13.svg?branch=master)](https://www.travis-ci.com/brad-smialek-401-advanced-javascript/lab-class-13))

* [HEROKU](https://lab13-brad.herokuapp.com/)

#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)

### Modules
#### `middleware.js`
#### `roles-model.js`
#### `router.js`
#### `users-model.js`
#### `401.js`
#### `501.js`
#### `play.js`


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost:27017/class-13
* `SECRET` in .env

#### Running the app
* `nodemon`
* Endpoint: `/signup`
  * Returns a bearer token
* Endpoint: `/signin`
  * Returns a bearer token
* Endpoint: `/secret`
  * res.send('You have access to the secrets')
* Endpoint: `/public-stuff`
  * res.send('this is the totally public route, not protected by the auth server')
* Endpoint: `/hidden-stuff`
  * res.send('this is a route that anyone with valid auth can see')
* Endpoint: `/something-to-read`
  * res.send('This route requires read credentials (You have them)
* Endpoint: `/create-a-thing`
  * res.send('This route requires create creds')
* Endpoint: `/update`
  * res.send('this route requires update creds')
* Endpoint: `/jp`
  * res.send('this is a route that anyone with valid auth can see')
* Endpoint: `/bye-bye`
  * res.send('this route requires delete creds'
* Endpoint: `/create-a-thing`
  * Returns a bearer token
* Endpoint: `/everything`
  * res.send('this is a route restricted to superusers only'

  
#### Tests
* How do you run tests? npm test in the terminal using jest


#### UML
![uml](./assets/jwtoken.png)

## IMG Source
* [Source](https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e)
