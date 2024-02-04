const express = require("express");

module.exports = function registerMiddlewares(app) {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
