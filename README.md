# LAB - 13

## Bearer Authorization

### Author: Brad Smialek

[![Build Status]()

### Links and Resources
* [submission PR](https://github.com/brandyn-vay-401-advanced-javascript/lab-class-13/pull/8)
* [travis](https://travis-ci.com/brandyn-vay-401-advanced-javascript/lab-class-13/builds/121183046)
* [back-end](https://bv-auth-bearer-server.herokuapp.com/)

#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)

### Modules
#### `routes.js`
#### `users-model.js`

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost:27017/auth
* `SECRET` 

#### Running the app
* `nodemon`
* Endpoint: `/signup`
  * Returns a bearer token
* Endpoint: `/signin`
  * Returns a bearer token
  
#### Tests
* How do you run tests? npm test in the terminal

#### UML
[one time jwt diagram](./assets/one-time-jwt-diagram.jpg)
