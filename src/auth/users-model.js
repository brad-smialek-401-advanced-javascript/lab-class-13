'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./roles-model.js');

const useToken = new Set();

// console.log('useToken', useToken);
console.log('this happens here in users-models');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']}, //superuser
}, { toObject:{virtuals:true}, toJSON:{virtuals:true}} );

users.virtual('acl',{
  ref:'roles',
  localField:'role',
  foreignField: 'role',
  justOne: true,
});

users.pre('findOne', function(){
  console.log('users.pre /findOne was hit');
  try {
    this.populate('acl');
  }
  
  catch(e){
    console.log('err');
    throw new Error(e.message);
  }
});

const capabilities = {
  admin: ['create', 'read','update', 'delete'],
  editor:['create', 'read', 'update'],
  user: ['read'],
};

users.methods.can = function(capability){
  console.log('users.methods.can  was hit');
  return capabilities[this.role].includes(capability);
};

users.pre('save', function(next) {
  console.log('users.pre /save was hit');
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.createFromOauth = function(email) {

  if(! email) { return Promise.reject('Validation Error'); }

  return this.findOne( {email} )
    .then(user => {
      if( !user ) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch( error => {
      console.log('Creating new user');
      let username = email;
      let password = 'none';
      return this.create({username, password, email});
    });

};

users.statics.authenticateToken = function(token) {
  console.log('users.statics.authenticateToken was hit');
  console.log('useToken', useToken);
  if (useToken.has(token) ) {
    return Promise.reject('Invalid Token');
  }

  useToken.add(token);

  let parsedToken = jwt.verify(token, process.env.SECRET);
  let query = {_id:parsedToken.id};
  console.log('this.findOne', query);
  return this.findOne(query);
};

users.statics.authenticateBasic = function(auth) {
  console.log('users.statics.authenticateBasic was hit');
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};


users.methods.comparePassword = function(password) {
  console.log('users.methods.comparePassword was hit');
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function() {
  console.log('users.methods.generateToken was hit');
  // let expires = {expiresIn: '45m'};
  let token = {
    id: this._id,
    role: this.role,
    // capabilities : this.acl.capabilities,
  };
  
  return jwt.sign(token, process.env.SECRET);
};

module.exports = mongoose.model('users', users);
