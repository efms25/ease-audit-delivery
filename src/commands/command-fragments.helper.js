module.exports = {
  addFilterOptions(program, allowedFilters = []) {
    let filterByDescription = "Field to be filtered.";

    if (allowedFilters.length) {
      const filterList = allowedFilters.reduce((acc, c, idx) => {
        acc += c;

        idx + 1 < allowedFilters.length ? (acc += ", ") : (acc += ".");

        return acc;
      }, "");

      filterByDescription += ` Allowed: ${filterList}`;
    }

    program
      .option("--filter-by <string>", filterByDescription)
      .option(
        "--filter-val <string>",
        "Value to be filtered by. Example: if --filter-by=status, --filter-val=pending",
      );

  },
  addPaginationOptions(program) {
    program
      .option("-p, --offset <number>", "Current page number. Default: 1")
      .option("-l, --limit <number>", "Amount of rows per page.");
  },
};
