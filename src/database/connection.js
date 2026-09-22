const { Pool } = require("pg");

const dbAccess = {
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? "localhost",
  POSTGRES_DB: process.env.POSTGRES_DB ?? "ease_queue_db",
  POSTGRES_USER: process.env.POSTGRES_USER ?? "ease_queue_user",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? "ease_queue_pass",
};

const connection = (function () {
  let client;

  if (!client) {
    client = new Pool({
      host: dbAccess.POSTGRES_HOST,
      database: dbAccess.POSTGRES_DB,
      user: dbAccess.POSTGRES_USER,
      password: dbAccess.POSTGRES_PASSWORD,
    });
  }
  console.info("Database running...\n\n")
  return {
    client: client,
  };
})();

module.exports = {
  connection,
};
