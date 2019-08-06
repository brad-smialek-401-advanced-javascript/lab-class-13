'use strict';

// To add and post user 
//echo '{"username":"m", "password":"n"}' | http post :3000/signin

const User = require('./users-model.js');

console.log('this happens here in middleware');

module.exports = (capability) => {

  console.log('this is capability console',capability);

  return (req, res, next) => {
    console.log(req.headers.authorization);
  
    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);
    
      switch( authType.toLowerCase() ) {
      case 'basic': 
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default: 
        return _authError();
      }
    }
    catch(e) {
      next(e);
    }


    function _authBearer(authString) {
      console.log('authString is :', authString);
      console.log('inside _authBearer in middleware');
      return User.authenticateToken(authString) // sign in with auth bearer...  go to user models to authenticate token
        .then(user => _authenticate(user) )
        .catch(next);
    }
  
  
    function _authBasic(str) {
      console.log('authBasic was hit');
      // str: am9objpqb2hubnk=
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = {username,password}; // { username:'john', password:'mysecret' }
    
      return User.authenticateBasic(auth)
        .then(user => _authenticate(user) )
        .catch(next);
    }

    function _authenticate(user) {
      console.log('authenticate was hit');
      console.log('AUTH', user);
      if(user && (!capability || (user.can(capability))) ) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }
  
    function _authError() {
      next('Invalid User ID/Password');
    }
  
  };
};