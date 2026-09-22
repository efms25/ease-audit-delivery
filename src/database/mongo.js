const { MongoClient } = require("mongodb");

const access = {
  host: process.env.MONGO_INITDB_ROOT_HOSTNAME ?? "localhost",
  port: process.env.MONGO_INITDB_ROOT_PORT ?? "27017",
  username: encodeURIComponent(
    process.env.MONGO_INITDB_ROOT_USERNAME ?? "ease_mongo_usr",
  ),
  password: encodeURIComponent(
    process.env.MONGO_INITDB_ROOT_PASSWORD ?? "ease_mongo_pass",
  ),
  dbName: process.env.MONGO_INITDB_DATABASE ?? "ease_asudit",
};

const uri = `mongodb://${access.username}:${access.password}@${access.host}:${access.port}/${access.dbName}?authSource=admin`;
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
});
let db;

async function startMongoConnection() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    db = client.db(access.dbName);

    return db;
  } catch (error) {
    console.log("Failed to connect to MongoDB: ", error.message);
    throw new Error(`MongoDB conneciton failed: ${error.message}`);
  }
}

function getDb(){
    if(!db) {
        throw new Error('Database not initialized. Call startMongoConnection() first');
    }
    return db;
}

module.exports = {
  startMongoConnection,
  client,
  getDb,
};
