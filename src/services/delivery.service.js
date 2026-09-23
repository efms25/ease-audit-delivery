const { find, findAssigned, findWithIncidents, createDelivery, updateDelivery, findById } = require("../queries/deliveries.queries");
const {printResultsTable} = require('../cli/utils/print-results');
const { recordEvent } = require("./event-audit.service");
const { EVENT_LOGS } = require("../constants");

const entityName = "delivery";

module.exports = {
    async get(id) {
        const result = await findById(id);
        console.log(result);
    },
    async find(data) {
        const result = await find(data);
        console.log(result, 'result del')
        printResultsTable(result);
    },
    async findAssigned(data) {
        const result = await findAssigned(data);
        printResultsTable(result);
    },
    async findWithIncidents(data) {
        const result = await findWithIncidents(data);
        printResultsTable(result);
    },
    async create(data) {
        const [result] = await createDelivery(data);

        const event = {
            changes: result,
            entityId: result.delivery_id
        }

        await recordEvent(entityName, EVENT_LOGS.CREATION, event);
        
        console.log(result);
    },
    async update(data) {
        const [result] = await updateDelivery(data);

        const event = {
            changes: result,
            entityId: result.delivery_id
        }

        await recordEvent(entityName, EVENT_LOGS.UPDATE, event);
        
        console.log(result);
    }
}