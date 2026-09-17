const { registerDeliveryCommands } = require('./delivery.commands');
const { registerIncidentCommands } = require('./incident.command');

module.exports = {
    registerCommands(program) {
        registerDeliveryCommands(program);
        registerIncidentCommands(program);
    }
}