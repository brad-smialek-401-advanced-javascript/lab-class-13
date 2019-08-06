'use strict';

process.env.SECRET='test';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      let loginToken;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET); // ?results.headers.auth
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });

      it('can signin with bearer', () => {
        return mockRequest.post('/signin')
          .set('authorization', 'bearer', + encodedToken)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });
    });
    
  });
  
});

// Testing
// Add test coverage to the auth tests to assert that:
// given a good token user is able to “log in” and receive a new token
// Tokens can optionally be expired
// Expired tokens do not allow a user to login
// Auth Keys can login a user as a token would
// Auth Keys do not expire
