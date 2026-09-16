const { connection } = require("../database/connection");
const {
  attachFilterQuery,
  attachPaginationQuery,
  paginationCounter,
} = require("./query.helper");

const ALLOWED_FILTERS = {
  client: "client_id",
  driver: "driver_id",
  status: "status",
  date: "created_at",
};

const defaultData = {
  filterBy: undefined,
  filterVal: undefined,
  offset: 1,
  limit: 5,
  allowedTypes: ALLOWED_FILTERS,
};

module.exports = {
  async find(args = {}) {
    const data = { ...defaultData, ...args };
    const client = connection.client;
    const table = "deliveries";

    let sql = `SELECT * FROM ${table};`;
    const params = [];

    if (data.filterBy && data.filterVal) {
      sql = attachFilterQuery(sql, data);
      params.push(data.filterVal);
    }
    const filteredQuery = sql;
    sql = attachPaginationQuery(sql, data);

    const result = await client.query(sql, params);
    const pagination = await paginationCounter(filteredQuery, data, params);

    return {
        data: result.rows,
        pagination
    };
  },
};
