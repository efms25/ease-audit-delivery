const { readdir, readFile } = require("node:fs/promises");
const { connection } = require("../database/connection");
const { isTypeCreated } = require("./validations");
const auditEventCollection = require('../migrations/mongo/001-create-audit-events-collection')
const auditEventIndex = require('../migrations/mongo/002-create-audit-events-index');
const { getDb, startMongoConnection } = require("./mongo");

async function migratePostgres() {
  const db = connection.client;
  const path = "src/migrations/postgres";

  const files = await readdir(path);

  const results = [];

  console.log("Migration start!\n\n");

  for (const file of files) {
    const fileBuffer = await readFile(`${path}/${file}`);
    const query = fileBuffer.toLocaleString();

    if (await isTypeCreated(query)) {
      console.log(`☑️ ${file} already executed!`);
      continue;
    }

    try {
      const result = await db.query(query);
      console.log(`✅ ${file}`);

      results.push(result);
    } catch (err) {
      console.log(`❌ ${file}`);
      throw new Error(`Failed to migrate. ${err}`);
    }
  }

  console.log("\n\nPostgress migration completed successfully!");
  return;
}

async function migrateMongo() { 
  await startMongoConnection();
  const easeDb = getDb();
  
  const migrations = [
    {
      name: "Audit event collection",
      up: auditEventCollection.up
    },
    {
      name: "Audit event indexes",
      up: auditEventIndex.up
    }
  ]

  for(const migration of migrations) {
    try {
      await migration.up(easeDb);
      console.log(`✅ ${migration.name} success!`)
    } catch (err) {
      console.log(`❌ ${migration.name} error`)
      throw new Error(err.message);
    }
  }

  console.log("\n\nMongodb migration completed successfully!");

}

(async function () {
  await migratePostgres();
  await migrateMongo();
})();
