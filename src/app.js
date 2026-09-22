const { program } = require("commander");
const { registerCommands } = require("./commands/index");
const { createConnection } = require("./cache/redis");
const { startMongoConnection } = require("./database/mongo");

module.exports = {
  async app() {
    await createConnection();
    await startMongoConnection();
    
    program.version("0.5.0");
    registerCommands(program);
    program.parse(process.argv);
  },
};
