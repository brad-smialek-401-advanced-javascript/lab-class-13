'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const Role = require('./roles-model.js');

console.log('this happens here in router.js');

let blacklist = [];
console.log('blacklist', blacklist);

authRouter.post('/roles', (req, res, next) => {
  console.log('authRouter/roles was hit');
  let role = new Role(req.body);
  role.save()
    .then( (role) => {

      res.send(role);
    }).catch(next);
});

authRouter.post('/signup', (req, res, next) => {
  console.log('authRouter/signup was hit');
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});


authRouter.post('/signin', auth(), (req, res, next) => {
  console.log('authRouter /signin was hit');
  console.log('request', req.body); // req has a bunch of shi....  includes headers with host , authorization and auth type, response server response, body with userinfo
  res.cookie('auth', req.token);// setting and sending cookie with token from req.body
  // res.set('auth', req.token);?? what does this do??
  res.send(req.token); // sends token from request with cookie 
});

authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

authRouter.post('/key', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  // res.set('auth', req.token);
  res.send(req.token);
});

authRouter.post('/onetime', auth(), (req, res, next) => {
  console.log(`request authorization: ${req.headers.authorization}`);
  if (blacklist.includes(req.headers.authorization)) { res.send('token is expired'); }
  blacklist.push(req.headers.authorization);
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.post('/secret', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send('You have access to the secrets');
});


authRouter.get('/public-stuff', (req, res, next) => {
  res.send('this is the totally public route, not protected by the auth server');
  // should be visible by anyone
});
authRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.send('this is a route that anyone with valid auth can see');
  // should require only a valid login
});
authRouter.get('/something-to-read', auth('read'), (req, res, next) => {
  res.send('This route requires read credentials (You have them)');
  //should require the read capability
});
authRouter.post('/create-a-thing', auth('create'), (req, res, next) => {
  res.send('This route requires create creds');
  //should require the create capability
});
authRouter.put('/update', auth('update'), (req, res, next) => {
  res.send('this route requires update creds');
  //should require the update capability
});
authRouter.patch('/jp', auth('update'), (req, res, next) => {
  res.send('this route also requires update creds');
  // should require the update capability
});

authRouter.delete('/bye-bye', auth('delete'), (req, res, next) => {
  res.send('this route requires delete creds');
  // should require the delete capability
});

authRouter.get('/everything', auth('superuser'), (req, res, next) => {
  res.send('this is a route restricted to superusers only');
  //should require the superuser capability
});



authRouter.post('/reset', (req, res, next) => {
  blacklist = [];
  res.send('reset the blacklist you little hacker you');
});

module.exports = authRouter;
