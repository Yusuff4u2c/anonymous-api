const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const registeredRoutes = require("./src/setups/routes");
const initializeApp = require("./src/setups/init");
const registereMidddlewares = require("./src/setups/midddlewares");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Welcome");
});
registereMidddlewares(app);
initializeApp(app);
registeredRoutes(app);
