module.exports = {
  async pgTypeCreated(query, connection) {
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
};
