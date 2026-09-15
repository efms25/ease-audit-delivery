const { registerDeliveryCommands } = require('./delivery.commands');

module.exports = {
    async registerCommands(program) {
        await registerDeliveryCommands(program);
    }
}