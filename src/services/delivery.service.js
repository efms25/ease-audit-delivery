const { find, findAssigned, findWithIncidents, createDelivery, updateDelivery, findById } = require("../queries/deliveries.queries");
const {printResultsTable} = require('../cli/utils/print-results');

module.exports = {
    async get(id) {
        const result = await findById(id);
        console.log(result);
    },
    async find(data) {
        const result = await find(data);
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
        const result = await createDelivery(data);
        console.log(result);
    },
    async update(data) {
        const result = await updateDelivery(data);
    }
}