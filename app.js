const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const registeredRoutes = require("./src/setups/routes");
const initializeApp = require("./src/setups/init");
const registereMidddlewares = require("./src/setups/midddlewares");
const cors = require("cors");
const configs = require("./src/configs");

const corsOptions = {
  origin: `${configs.frontend_url}`,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Welcome");
});
registereMidddlewares(app);
initializeApp(app);
registeredRoutes(app);
