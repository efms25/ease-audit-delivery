module.exports = {
    async up(db) {
        const collectionName = 'auditEvents';
        const collection = db.collection(collectionName);

        collection.createIndex({entity: 1});
        collection.createIndex({type: 1});
        collection.createIndex({timestamp: -1});
        collection.createIndex({entity: 1, type: 1, timestamp: -1});
    }
}