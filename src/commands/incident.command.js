const { find, create, update } = require("../services/incident.service");
const { addPaginationOptions } = require("./command-fragments.helper");

function registerQueryDeliveryCommands(incidents) {
  const list = incidents
    .command("list")
    .description("Return a list of incidents")
    .action(async (options) => {
      await find(options);
      process.exit(0);
    });

  addPaginationOptions(list);
}

function registerMutationDeliveryCommands(delivery) {
  delivery
    .command("create")
    .description(
      `Create new incident: Structure: {
        --delivery <int>, 
        --incident_time <string>, 
        --description <string>, 
        --outcome <string>, 
      `,
    )
    .requiredOption("--delivery <int>", "Delivery id")
    .requiredOption("--incident_time <string>", "Incident date")
    .requiredOption("--description <string>", "Incident description")
    .option("--outcome <string>", "Outcome of the incident")
    .action(async (args) => {
      const dataArgs = {
        delivery_id: args.delivery,
        incident_time: args.incident_time,
        description: args.description,
        outcome: args.outcome,
      };
      await create(dataArgs);
      process.exit(0);
    });

  delivery
    .command("update")
    .description(
      `Updates a incident: Structure: {
        --id: <int> REQUIRED
        --delivery <int>, 
        --incident_time <string>, 
        --description <string>, 
        --outcome <string> }
      `,
    )
    .requiredOption("--id <int>", "Delivery id")
    .option("--delivery <int>", "Delivery id")
    .option("--incident_time <int>", "incident time")
    .option("--description <string>", "description")
    .option("--outcome <string>", "Outcome")
    .action(async (args) => {
      const dataArgs = {
        id: args.id,
        delivery_id: args.delivery,
        incident_time: args.incident_time,
        description: args.description,
        outcome: args.outcome,
      };
      await update(dataArgs);
      process.exit(0);
    });
}

module.exports = {
  registerIncidentCommands(program) {
    let incident = program
      .command("incident")
      .description("Incidents handle");

    registerQueryDeliveryCommands(incident);

    registerMutationDeliveryCommands(incident);
  },
};
