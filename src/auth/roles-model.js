'use strict';


const mongoose = require('mongoose');
console.log('this happened in roles-model.js');
const rolesSchema = new mongoose.Schema({
  role: {type: String, required:true},
  capabilities: {type: Array, required: true},
});


module.exports = mongoose.model('roles', rolesSchema);