const { readdir, readFile } = require("node:fs/promises");
const { connection } = require("../database/connection");
const { isTypeCreated } = require("./validations");

(async function () {
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

  console.log("\n\nMigration completed successfully!");
  return;
})();
