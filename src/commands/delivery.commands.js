const { find } = require("../services/delivery.service");
const {
  addFilterOptions,
  addPaginationOptions,
} = require("./command-fragments.helper");

module.exports = {
  async registerDeliveryCommands(program) {
    const delivery = program.command("delivery").description("Delivery handle");

    const list = delivery
      .command("list")
      .description("Return a list of deliveries")
      .action(async (options) => {
        await find(options);
        process.exit(0);
      });

    addFilterOptions(list, ["client", "driver", "status", "date"]);
    addPaginationOptions(list);

    const listAssigned = delivery
      .command("list:assigned")
      .description("Return only deliveries with client and driver assigned");

    addFilterOptions(listAssigned, ["client", "driver", "status", "date"]);
    addPaginationOptions(listAssigned);

    const listBindIncidents = delivery
      .command("list:bind-incidents")
      .description("Return all deliveries with extra incidents data");

    addFilterOptions(listBindIncidents, ["client", "driver", "status", "date"]);
    addPaginationOptions(listBindIncidents);
  },
};
