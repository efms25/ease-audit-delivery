const { registerDeliveryCommands } = require('./delivery.commands');
const { registerIncidentCommands } = require('./incident.command');
const { registerRefundCommands } = require('./refund.commands');

module.exports = {
    registerCommands(program) {
        registerDeliveryCommands(program);
        registerIncidentCommands(program);
        registerRefundCommands(program);
    }
}