const express = require("express");
const app = express();
const registeredRoutes = require("./src/routes.js/index");

registeredRoutes(app);
