const env = require("env-var");

const DATABASE_URL = env.get("DATABASE_URL").required().asString();

module.exports = DATABASE_URL;
