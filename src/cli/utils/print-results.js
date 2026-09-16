function printResultsTable(result) {
    console.table(result.data);
    console.log(`Page: ${result.pagination.currentPage}/${result.pagination.totalPages}`)
    console.log(`Total items: ${result.pagination.totalItems}`)
}

module.exports = {
    printResultsTable
}