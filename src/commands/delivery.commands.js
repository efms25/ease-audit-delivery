const { createDelivery } = require("../queries/deliveries.queries");
const {
  find,
  findAssigned,
  findWithIncidents,
  update,
} = require("../services/delivery.service");
const {
  addFilterOptions,
  addPaginationOptions,
} = require("./command-fragments.helper");

function registerQueryDeliveryCommands(delivery) {
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
    .description("Return only deliveries with client and driver assigned")
    .action(async (options) => {
      await findAssigned(options);
      process.exit(0);
    });

  addFilterOptions(listAssigned, ["client", "driver", "status", "date"]);
  addPaginationOptions(listAssigned);

  const listBindIncidents = delivery
    .command("list:bind-incidents")
    .description("Return all deliveries with extra incidents data")
    .action(async (options) => {
      await findWithIncidents(options);
      process.exit(0);
    });

  addFilterOptions(listBindIncidents, ["client", "driver", "status", "date"]);
  addPaginationOptions(listBindIncidents);
}

function registerMutationDeliveryCommands(delivery) {
  delivery
    .command("create")
    .description(
      `Create new delivery: Structure: {
        --client_id <int>, 
        --driver_id <int>, 
        --item_name <string>, 
        --address <string>, 
        --status <'created' | 'undelivered' | 'pending' | 'delivered'> }
      `,
    )
    .requiredOption("--client <int>", "Client id")
    .option("--driver <int>", "Driver id")
    .requiredOption("--item <string>", "Item name")
    .requiredOption("--address <string>", "Address")
    .option(
      "--status <string>",
      "Default: pending. Allowed: 'created' | 'undelivered' | 'pending' | 'delivered'",
    )
    .action(async (args) => {
      const dataArgs = {
        client_id: args.client,
        driver_id: args.driver,
        item_name: args.item,
        address: args.address,
        status: args.status,
      };
      await createDelivery(dataArgs);
      process.exit(0);
    });

  delivery
    .command("update")
    .description(
      `Updates a delivery: Structure: {
        --id: <int> REQUIRED
        --client_id <int>, 
        --driver_id <int>, 
        --item_name <string>, 
        --address <string>, 
        --status <'created' | 'undelivered' | 'pending' | 'delivered'> }
      `,
    )
    .requiredOption('--id <int>', 'Delivery id')
    .option("--client <int>", "Client id")
    .option("--driver <int>", "Driver id")
    .option("--item <string>", "Item name")
    .option("--address <string>", "Address")
    .option(
      "--status <string>",
      "Default: pending. Allowed: 'created' | 'undelivered' | 'pending' | 'delivered'",
    ).action(async (args) => {
      const dataArgs = {
        id: args.id,
        client_id: args.client,
        driver_id: args.driver,
        item_name: args.item,
        address: args.address,
        status: args.status,
      };
      await update(dataArgs);
      process.exit(0);
    });
}

module.exports = {
  async registerDeliveryCommands(program) {
    const delivery = program.command("delivery").description("Delivery handle");

    registerQueryDeliveryCommands(delivery);
    registerMutationDeliveryCommands(delivery);
  },
};
