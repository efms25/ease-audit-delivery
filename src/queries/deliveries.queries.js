const {connection} = require('../database/connection');
module.exports = {
    async find(filterBy, filterVal) {
        const client = connection.client;
        let filter = '';

        if(filterBy && filterVal) {
            filter = ` WHERE ${filterBy} = '${filterVal}'`
        }
        
        const sql = `
            SELECT * FROM deliveries${filter};
        `;

        console.log(sql)

        const result = await client.query(sql);

        return result.rows;
    },
}