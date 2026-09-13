const { readdir, readFile } = require("node:fs/promises");
const { connection } = require("../database/connection");
const { isTableCreated, isTableEmpty } = require("./validations");

(async function() {
    const db = connection.client;
    const path = "src/seeds";

    const files = await readdir(path);

    for(const file of files) {
        const fileBuffer = await readFile(`${path}/${file}`);
        const query = fileBuffer.toLocaleString();
        
        try {
            if(isTableCreated(query)) {
                throw new Error(`Exception: Required tables from ${file} are not created. Run db:migrate before seeding.`)
            }
            if(!isTableEmpty(query)) {
                console.log(`⚠️ seeding stopped in file: ${file}. Table must be empty to seeding.`);
                return;
            }
            //seeding implementation.
        } catch(err) {
            console.log(`❌ ${file}`);
            throw new Error(`Seeding error: ${err}`);
        }
    }
})()