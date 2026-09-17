const { printResultsTable } = require("../cli/utils/print-results");
const { findIncidents, createIncidents, updateIncidents } = require("../queries/incident.queries");

module.exports = {
    async find(data) {
        const result = await findIncidents(data);
        printResultsTable(result);
    },
    async create(data) {
        const result = await createIncidents(data);
        console.log(result);
    },
    async update(data) {
        const result = await updateIncidents(data);
    }
}