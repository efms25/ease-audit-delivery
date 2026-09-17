const { connection } = require("../database/connection");
const { attachPaginationQuery, paginationCounter } = require("./query.helper");

const defaultData = {
  offset: 1,
  limit: 5,
};

async function findIncidents(args = {}) {
  const data = { ...defaultData, ...args };
  const db = connection.client;

  let sql = `SELECT * FROM incidents;`;
  const params = [];

  sql = attachPaginationQuery(sql, data);

  const result = await db.query(sql, params);
  const pagination = await paginationCounter(sql, data, params);

  return {
    data: result.rows,
    pagination,
  };
}
async function createIncidents(dataObject) {
  const db = connection.client;
  let placeholders;
  let values = [];

  placeholders = `($1, $2, $3, $4)`;
  values = [
    dataObject.delivery_id,
    dataObject.incident_time,
    dataObject.description,
    dataObject.outcome ?? null,
  ];

  const sql = `
    INSERT INTO incidents 
    (delivery_id, incident_time, description, outcome)
    VALUES 
    ${placeholders};
    `;

  await db.query(sql, values);
  console.log(`Added register`);
}

async function updateIncidents(bodyData) {
  const db = connection.client;
  const { id: incident_id, ...updateData } = bodyData;
  const params = [incident_id];

  const placeholder = Object.entries(updateData).reduce((acc, c) => {
    if (!!c[1]) {
      acc += `${c[0]} = $${params.length + 1}`;
      params.push(c[1]);
    }
    return acc;
  }, "");

  const sql = `
      UPDATE incidents SET ${placeholder}
      WHERE incident_id = $1
    `;

  await db.query(sql, params);

  console.log("Updated!");
}

module.exports = {
  findIncidents,
  createIncidents,
  updateIncidents,
};
