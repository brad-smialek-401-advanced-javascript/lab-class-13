'use strict';

const express = require('express');

const auth = require('../auth/middleware.js');
const router = express.Router();

router.get('/profile', auth(), (req, res)=> {
  res.status(200).send('you are at profile');
});

router.get('/read', auth('read'), (req, res) => {
  res.status(200).send('you can read');
});

router.get('/create', auth('create'), (req, res) => {
  res.status(200).send('you can create');
});

router.get('/delete', auth('delete'), (req, res) => {
  res.status(200).send('you can delete');
});

router.get('/update', auth('update'), (req, res) => {
  res.status(200).send('you can update');
});

module.exports = router;