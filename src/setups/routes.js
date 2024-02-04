const baseRoute = require("../routes");

module.exports = function registeredRoutes(app) {
  app.use("/", baseRoute);
};
