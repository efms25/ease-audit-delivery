const { find, update, create, approve, reject, get } = require("../services/refund.service");
const {
  addFilterOptions,
  addPaginationOptions,
} = require("./command-fragments.helper");

function registerQueryRefundCommands(refund) {
  refund
    .command("get <number>")
    .description("Get a refund by id")
    .action(async (arg) => {
      await get(arg);
      process.exit(0);
    })

  const list = refund
    .command("list")
    .description("Return a list of refunds")
    .action(async (options) => {
      await find(options);
      process.exit(0);
    });

  addFilterOptions(list, ["client", "driver", "status", "date"]);
  addPaginationOptions(list);
}

function registerMutationRefundCommands(refund) {
  refund
    .command("create")
    .description(
      `Create new refund: Structure: {
        --incident <int>, 
      `,
    )
    .requiredOption("--incident <int>", "Incident id")
    .action(async (args) => {
      const dataArgs = {
        incident_id: args.incident,
      };
      await create(dataArgs);
      process.exit(0);
    });

  refund
    .command("update")
    .description(
      `Updates a refund: Structure: {
        --id: <int> REQUIRED
        --incident <int>, 
        --status <'in_process' | 'not_refunded' | 'refunded' > }
      `,
    )
    .requiredOption("--id <int>", "Refund id")
    .option("--incident <int>", "Incident id")
    .action(async (args) => {
      const dataArgs = {
        id: args.id,
        incident_id: args.incident,
        refund_status: args.status,
      };
      await update(dataArgs);
      process.exit(0);
    });
}

function registerRefundLifecycleCommands(refund) {
  refund
    .command("approve")
    .description(`Aprove a refund`)
    .argument("<refund-id>")
    .option('-o, --observation <string>')
    .action(async (args, options) => {
      await approve(args, options?.observation)
      process.exit(0);
    });
    
    refund
    .command("reject")
    .description(`Reprobate a refund`)
    .argument("<refund-id>")
    .option('-o, --observation <string>')
    .action(async (args, options) => {
      await reject(args, options?.observation)
      process.exit(0);
    })
}

module.exports = {
  async registerRefundCommands(program) {
    const refund = program.command("refund").description("refund handle");

    registerQueryRefundCommands(refund);
    registerMutationRefundCommands(refund);
    registerRefundLifecycleCommands(refund);
  },
};
