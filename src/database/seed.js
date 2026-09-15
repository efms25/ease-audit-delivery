const { readdir, readFile } = require("node:fs/promises");
const { connection } = require("../database/connection");
const { isTableCreated, isTableEmpty } = require("./validations");

(async function () {
  const db = connection.client;
  const path = "src/seeds";

  await db.connect();

  const files = await readdir(path);

  for (const file of files) {
    const fileBuffer = await readFile(`${path}/${file}`);
    const query = fileBuffer.toLocaleString();

    try {
      if (!(await isTableCreated(query))) {
        throw new Error(
          `Required tables from ${file} are not created. Run db:migrate before seeding.`,
        );
      }
      if (!(await isTableEmpty(query))) {
        console.log(
          `⚠️ seeding skip in file: ${file}. Table must be empty to seeding.`,
        );
        continue;
      }

      const result = await db.query(query);
      // console.log(result);
      console.log(`✅ ${file}`);

      //seeding implementation.
    } catch (err) {
      console.log(`❌ ${file}`);
      throw new Error(`Seeding failed. ${err}`);
    }
  }
})();
