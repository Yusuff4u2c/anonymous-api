const configs = {
  jwt_key: process.env.SECRET_TOKEN,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
  verify_email_endpoint: process.env.VERIFY_EMAIL_ENDPOINT,
  update_email_endpoint: process.env.UPDATE_EMAIL_ENDPOINT,
  update_password_endpoint: process.env.UPDATE_PASSWORD_ENDPOINT,
};
module.exports = configs;
