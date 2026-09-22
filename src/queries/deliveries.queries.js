const {
  getDeliveryCache,
  setDeliveryCache,
  delDeliveryCache,
} = require("../cache/delivery-cache");
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

    const cacheKey = [
      "delivery",
      `filter:${data.filterBy ?? "any"}:${data.filterVal ?? "all"}`,
      `page:${data.offset}:${data.limit}`,
    ]
      .join(":")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_:-]/g, "");

    const cached = await getDeliveryCache(cacheKey);

    if (cached) {
      return cached;
    }

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

    await setDeliveryCache(cacheKey, result.rows);

    return {
      data: result.rows,
      pagination,
    };
  },
  async findById(id) {
    const db = connection.client;

    // cache verification
    const cacheKey = `delivery:${id}`;

    const cached = await getDeliveryCache(cacheKey);

    if (cached) {
      return cached;
    }

    const sql = "SELECT * FROM deliveries WHERE delivery_id = $1";

    const result = await db.query(sql, [id]);

    await setDeliveryCache(cacheKey, result.rows);

    return result.rows;
  },
  async findAssigned(args = {}) {
    const data = { ...defaultData, ...args, allowedTypes };
    const db = connection.client;
    const params = [];

    const cacheKey = [
      "delivery",
      "assigned",
      `filter:${data.filterBy ?? "any"}:${data.filterVal ?? "all"}`,
      `page:${data.offset}:${data.limit}`,
    ]
      .join(":")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_:-]/g, "")
      .trim();
    const cached = await getDeliveryCache(cacheKey);

    if (cached) {
      return cached;
    }

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

    await setDeliveryCache(cacheKey, result.rows);

    return {
      data: result.rows,
      pagination,
    };
  },
  async findWithIncidents(args = {}) {
    const allowedTypes = {
      ...ALLOWED_FILTERS,
      ...{
        incident_time: "incident_time",
        incident: "incident_id",
      },
    };
    const data = { ...defaultData, ...args, allowedTypes };
    const db = connection.client;
    const params = [];

    const cacheKey = [
      "delivery",
      "bindincidents",
      `filter:${data.filterBy ?? "any"}:${data.filterVal ?? "all"}`,
      `page:${data.offset}:${data.limit}`,
    ]
      .join(":")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_:-]/g, "")
      .trim();

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
    sql = sql.replace(";", "") + ";";

    sql = attachPaginationQuery(sql, data);

    const result = await db.query(sql, params);
    const pagination = await paginationCounter(filteredQuery, data, params);

    await setDeliveryCache(cacheKey, result.rows);

    return {
      data: result.rows,
      pagination,
    };
  },
  async createDelivery(dataObject) {
    const db = connection.client;
    let placeholders;
    let values = [];

    if (Array.isArray(dataObject)) {
      placeholders = dataObject
        .map(
          (_, idx) =>
            `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5})`,
        )
        .join(", ");
      values = dataObject.flatMap((obj) => [
        obj.client_id,
        obj.driver_id ?? null,
        obj.item_name,
        obj.address,
        obj.status ?? "pending",
      ]);
    } else {
      placeholders = `($1, $2, $3, $4, $5)`;
      values = [
        dataObject.client_id,
        dataObject.driver_id ?? null,
        dataObject.item_name,
        dataObject.address,
        dataObject.status ?? "pending",
      ];
    }

    const sql = `
    INSERT INTO deliveries 
    (client_id, driver_id, item_name, address, status)
    VALUES 
    ${placeholders};
    `;

    const result = await db.query(sql, values);

    console.log(result);

    console.log(`Added register`);
  },
  async updateDelivery(bodyData) {
    const db = connection.client;
    const { id: delivery_id, ...updateData } = bodyData;
    const params = [delivery_id];

    const placeholder = Object.entries(updateData).reduce((acc, c) => {
      if (!!c[1]) {
        acc += `${c[0]} = $${params.length + 1}`;
        params.push(c[1]);
      }
      return acc;
    }, "");

    const sql = `
      UPDATE deliveries SET ${placeholder}
      WHERE delivery_id = $1
    `;

    await db.query(sql, params);
    const cacheKey = `delivery:${id}`;
    delDeliveryCache(cacheKey);

    console.log("Updated!");
  },
};
