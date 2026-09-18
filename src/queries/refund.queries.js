const { connection } = require("../database/connection");
const {
  attachFilterQuery,
  attachPaginationQuery,
  paginationCounter,
} = require("./query.helper");

const defaultData = {
  offset: 1,
  limit: 5,
};

module.exports = {
  async findRefunds(args = {}) {
    const data = { ...defaultData, ...args };
    const db = connection.client;

    let sql = `SELECT * FROM refunds;`;
    const params = [];

    if (data.filterBy && data.filterVal) {
      sql = attachFilterQuery(sql, data);
      params.push(data.filterVal);
    }
    const filteredQuery = sql;
    sql = attachPaginationQuery(sql, data);

    const result = await db.query(sql, params);
    const pagination = await paginationCounter(filteredQuery, data, params);

    return {
      data: result.rows,
      pagination,
    };
  },
  async createRefund(dataObject) {
    const db = connection.client;
    let placeholders;
    let values = [];

    placeholders = `($1, $2)`;
    values = [dataObject.incident_id, "in_process"];

    const sql = `
    INSERT INTO refunds
    (incident_id, refund_status) VALUES 
    ${placeholders};
    `;

    await db.query(sql, values);
    console.log(`Added register`);
  },
  async updateRefund(bodyData) {
    const db = connection.client;
    const { id: refund_id, ...updateData } = bodyData;
    const params = [refund_id];

    updateData["updated_at"] = new Date();

    const placeholder = Object.entries(updateData).reduce((acc, c) => {
      if (!!c[1]) {
        acc += `${c[0]} = $${params.length + 1}`;
        params.push(c[1]);
      }
      return acc;
    }, "");

    const sql = `
      UPDATE refunds SET ${placeholder}
      WHERE refund_id = $1
    `;

    await db.query(sql, params);

    console.log("Updated!");
  },
  async resolveRefund(id, observation = null, outcomeDirection = "approve") {
    const db = await connection.client.connect();

    const ALLOWED_OUTCOME_REFUND_STATUS = {
      approve: "refunded",
      reject: "not_refunded",
    };

    if (!ALLOWED_OUTCOME_REFUND_STATUS[outcomeDirection]) {
      throw new Error("Invalid refund outcome");
    }

    try {
      db.query("BEGIN");
      const refundQueryResult = await db.query(
        `SELECT refunds.refund_id, refunds.refund_status, refunds.incident_id, incidents.delivery_id
         FROM refunds
         INNER JOIN incidents ON refunds.incident_id = incidents.incident_id
         WHERE refund_id = $1`,
        [id],
      );
      const refund = refundQueryResult.rows[0];

      if (!refund) {
        throw new Error("refund not found");
      }

      //update refunds
      await db.query(
        "UPDATE refunds SET refund_status = $1 WHERE refund_id = $2",
        [ALLOWED_OUTCOME_REFUND_STATUS[outcomeDirection], id],
      );

      //update incidents
      if (observation) {
        await db.query(
          "UPDATE incidents SET outcome = $1 WHERE incident_id = $2",
          [observation, refund.incident_id],
        );
      }

      if (outcomeDirection === "approve") {
        await db.query(
          "UPDATE deliveries SET status = 'refunded' WHERE delivery_id = $1",[
            refund.delivery_id
          ],
        );
      }

      db.query("COMMIT");
    } catch (err) {
      db.query("ROLLBACK");
      throw err;
    } finally {
      db.release();
    }
  },
};
