const { program } = require("commander");
const { registerCommands } = require("./commands/index");
const { createConnection } = require("./cache/redis");

module.exports = {
  async app() {
    await createConnection();
    
    program.version("0.5.0");
    registerCommands(program);
    program.parse(process.argv);
  },
};
