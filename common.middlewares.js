const express = require('express');

module.exports.addCommonMiddlewares = (app) => {
// json log middleware
  app.use(function (req, res, next) {
    console.log(`request url: ${req.url}`);
    next()
  });
// json parser middleware
  app.use(express.json());
// urlencoded parser middleware
  app.use(express.urlencoded({extended: true}));
};