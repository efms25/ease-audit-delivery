const { connection } = require("./connection");

module.exports = {
  async isTypeCreated(query) {
    if (query.includes("CREATE TYPE")) {
      const match = query.match(/CREATE\s+TYPE\s+(\w+)/i);
      const client = connection.client;
      const typename = match?.[1];
      const result = await client.query(
        `
            SELECT 1 
            FROM pg_type 
            WHERE typname = $1
        `,
        [typename],
      );
      return result.rowCount;
    }
    return false;
  },
  async isTableCreated(query) {
    const match = query.match(/INSERT\s+INTO\s+(?:\w+\.)?(\w+)/i);
    const client = connection.client;

    const tableName = match?.[1];

    
    const checkQuery = `
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = $1
    `;
    
    const result = await client.query(checkQuery, [tableName]);

    return result.rowCount;
  },
  async isTableEmpty(query) {
    const match = query.match(/INSERT\s+INTO\s+(?:\w+\.)?(\w+)/i);
    const client = connection.client;

    const tableName = match?.[1];

    const checkQuery = `
      SELECT *
      FROM ${tableName};
    `;

    const result = await client.query(checkQuery);

    return !result.rowCount;
  },
};
