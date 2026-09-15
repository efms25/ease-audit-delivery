const { find } = require("../queries/deliveries.queries");

module.exports = {
    async find(filterBy, filterData) {
        return await find(filterBy, filterData);
    }
}