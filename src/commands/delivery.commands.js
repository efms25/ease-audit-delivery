module.exports = {
  async registerDeliveryCommands(program) {
    const delivery = program.command("delivery").description("Delivery handle");

    delivery
      .command("list")
      .description("Return a list of deliveries")
      .option(
        "--filter-by <string>",
        "field to be filtedred. Allowed: client, driver, status or date",
      )
      .option(
        "--filter-val <string>",
        "Value to be filtered by. Example: if --filter-by=status, --filter-val=pending",
      ).action((_, options) => {
        console.table([{name: "test-name", status: "test-status"},{name: "test-name2", status: "test-status2"}], ['name', 'status']);
      });

    (delivery
      .command("list:assigned")
      .description("Return only deliveries with client and driver assigned")
      .option(
        "--filter-by <string>",
        "field to be filtedred. Allowed: client, driver, status or date",
      ).
      option(
        "--filter-val <string>",
        "Value to be filtered by. Example: if --filter-by=status, --filter-val=pending",
      ));

    (delivery
      .command("list:bind-incidents")
      .description("Return all deliveries with extra incidents data")
      .option(
        "--filter-by <string>",
        "field to be filtedred. Allowed: client, driver, status or date",
      ).
      option(
        "--filter-val <string>",
        "Value to be filtered by. Example: if --filter-by=status, --filter-val=pending",
      ));
  },
};
