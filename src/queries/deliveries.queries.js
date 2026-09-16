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
    const db = connection.client;

    let sql = `SELECT * FROM deliveries;`;
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
  async findAssigned(args = {}) {
    const data = { ...defaultData, ...args };
    const db = connection.client;
    const params = [];

    let sql = `SELECT 
                deliveries.delivery_id, 
                deliveries.item_name, 
                deliveries.address, 
                deliveries.status, 
                deliveries.created_at,
                clients.name AS client_name,
                clients.email AS cllient_email,
                drivers.name AS driver_name,
                drivers.license_plate AS driver_license_plate
            FROM deliveries
            INNER JOIN clients 
            ON deliveries.client_id = clients.client_id
            INNER JOIN drivers
            ON deliveries.driver_id = drivers.driver_id`;

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
  async findWithIncidents(args = {}) {
    const data = { ...defaultData, ...args };
    const db = connection.client;
    const params = [];

    let sql = `SELECT 
                deliveries.delivery_id, 
                deliveries.item_name, 
                deliveries.address, 
                deliveries.status, 
                deliveries.created_at,
                incidents.incident_id,
                incidents.description AS incident_description,
                incidents.incident_time
            FROM deliveries
            LEFT JOIN incidents
            ON deliveries.delivery_id = incidents.delivery_id`;

    if (data.filterBy && data.filterVal) {
      sql = attachFilterQuery(sql, data);
      params.push(data.filterVal);
    }
    const filteredQuery = sql;
    
    sql += " ORDER BY incident_time DESC NULLS LAST";
    sql = sql.replace(';','') + ';';
    
    sql = attachPaginationQuery(sql, data);

    const result = await db.query(sql, params);
    const pagination = await paginationCounter(filteredQuery, data, params);

    return {
      data: result.rows,
      pagination,
    };
  },
};
