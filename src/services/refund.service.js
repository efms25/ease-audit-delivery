const { printResultsTable } = require("../cli/utils/print-results");
const {
  findRefunds,
  createRefund,
  updateRefund,
  resolveRefund,
} = require("../queries/refund.queries");

module.exports = {
  async find(data) {
    const result = await findRefunds(data);
    printResultsTable(result);
  },
  async create(data) {
    const result = await createRefund(data);
    console.log(result);
  },
  async update(data) {
    const result = await updateRefund(data);
  },
  async approve(id, observation) {
    await resolveRefund(id, observation);
    console.log('Refund approved!')
  },
  async reject(id, observation = '') {
    await resolveRefund(id, observation, 'reject');
    console.log('Refund rejected!')

  }
};
