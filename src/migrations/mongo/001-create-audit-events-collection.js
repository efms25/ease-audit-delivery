module.exports = {
    async up(db) {
        const collectionName = 'auditEvents';
        
        const collections = await db.listCollections({}, { nameOnly: true}).toArray();
        const exists = collections.some(col => col.name === collectionName);

        
        if(!exists) {
            await db.createCollection(collectionName);
            return;
        }
        console.log(`☑️ ${collectionName} collection already exists.`)
        
    }
}