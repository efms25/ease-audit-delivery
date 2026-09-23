const { printResultsTable } = require("../cli/utils/print-results");
const { EVENT_LOGS } = require("../constants");
const {
  findById,
  findRefunds,
  createRefund,
  updateRefund,
  resolveRefund,
} = require("../queries/refund.queries");
const { recordEvent } = require("./event-audit.service");

const entityName = "refund";

module.exports = {
  async find(data) {
    const result = await findRefunds(data);
    printResultsTable(result);
  },
  async create(data) {
    const [result] = await createRefund(data);

    const event = {
      changes: result,
      entityId: result.refund_id,
    };

    await recordEvent(entityName, EVENT_LOGS.CREATION, event);

    console.log(result);
  },
  async update(data) {
    const [refund] = await findById(data.id);

    const result = await updateRefund(data);

    const event = {
      changes: result,
      entityId: result.refund_id,
      previousData: refund,
    };

    await recordEvent(entityName, EVENT_LOGS.UPDATE, event);
  },
  async approve(id, observation) {
    const [refund] = await findById(id);

    const [result] = await resolveRefund(id, observation);

    const event = {
      changes: result,
      entityId: id,
      previousData: refund,
    };

    await recordEvent(entityName, EVENT_LOGS.APPROVAL, event);

    console.log("Refund approved!");
  },
  async reject(id, observation = "") {
    const [refund] = await findById(id);

    const [result] = await resolveRefund(id, observation, "reject");

    const event = {
      changes: result,
      entityId: id,
      previousData: refund,
    };

    await recordEvent(entityName, EVENT_LOGS.REJECTION, event);
    console.log("Refund rejected!");
  },
};
