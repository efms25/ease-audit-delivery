const { find } = require("../queries/deliveries.queries");

module.exports = {
    async find(data) {
        const result = await find(data);
        console.table(result.data);
        console.log(`Page: ${result.pagination.currentPage}/${result.pagination.totalPages}`)
        console.log(`Total items: ${result.pagination.totalItems}`)
        return result;
    }
}