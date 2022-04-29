// hello.js
const express = require('express');
const cors = require('cors');
module.exports = (req, res, next) => {
    res.header('X-Hello', 'World')
    
    next()
  }