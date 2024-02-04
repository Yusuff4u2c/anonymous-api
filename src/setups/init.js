const mongoose = require("mongoose");
const configs = require("../configs");

module.exports = function initializeApp(app) {
  async function run() {
    const connection = await mongoose.connect(`${configs.database_url}`);
    if (connection) {
      console.log("connected");
      app.listen(configs.port, () => {
        console.log("App listening on port " + configs.port);
      });
    } else throw new Error();
  }
  run().catch((error) => {
    console.log(error);
  });
};
