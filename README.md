# LAB - 13

## Bearer Authorization

### Author: Brad Smialek

[![Build Status]()

### Links and Resources
* [travis]([![Build Status](https://www.travis-ci.com/brad-smialek-401-advanced-javascript/lab-class-13.svg?branch=master)](https://www.travis-ci.com/brad-smialek-401-advanced-javascript/lab-class-13))

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
![uml](./assets/jwtoken.png)

##Source
* [Source](https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e)
