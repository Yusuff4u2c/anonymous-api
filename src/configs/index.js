const configs = {
  jwt_key: process.env.SECRET_TOKEN,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
module.exports = configs;
