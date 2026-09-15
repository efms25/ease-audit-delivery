const { program } = require("commander");
const { registerCommands } = require("./commands/index");

module.exports = {
  async app(connection) {
    program.version("0.5.0");
    registerCommands(program);
    program.parse(process.argv);
  },
};
