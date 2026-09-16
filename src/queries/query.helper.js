const { connection } = require('../database/connection');
module.exports = {
  attachFilterQuery(sql, data) {
    const { filterBy, filterVal, allowedTypes } = data;

    if (filterBy && filterVal) {
      const column = allowedTypes[filterBy];
      if (!column) {
        throw new Error(`Invalid filter: ${filterBy}`);
      }
      sql += ` WHERE ${column} = $1`;
      sql = sql.replace(";", "") + ";";
    }
    return sql;
  },
  attachPaginationQuery(sql, data) {
    const offset = Number(data.offset);
    const limit = Number(data.limit);

    if (Number.isInteger(offset) && Number.isInteger(limit)) {
      sql += ` OFFSET ${(offset - 1) * limit} LIMIT ${limit}`;
      sql = sql.replace(";", "") + ";";
    }
    return sql;
  },
  async paginationCounter(sql, data, params = []) {
    const client = connection.client;
    const countResult = await client.query(`SELECT COUNT(*) AS total FROM (${sql.replace(';','')})`, params);
    const totalItems = countResult.rows?.[0].total;

    return {
        totalItems: Number(totalItems),
        totalPages: Math.ceil(totalItems / data.limit),
        currentPage: Number(data.offset)
    }

  }
};
