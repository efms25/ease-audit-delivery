const { EVENT_LOGS } = require('../constants')
const { getDb } = require('../database/mongo')

async function recordEvent(entity, eventLogType, event) {
    const db = getDb();

    
    if (!EVENT_LOGS[eventLogType]) {
        throw new Error(`EVENT_LOG type not found`);
    }

    if(!event.changes) {
        throw new Error(`event.changes is required for auditory logs`);
    } 

    const eventData = {
        entity,
        entityId: event.entityId ?? null,
        type: EVENT_LOGS[eventLogType],
        timestamp: new Date(),
        changes: {
            new: event.changes,
            previous: event.previousData ?? null
        }
    }
    
    db.collection("auditEvents").insertOne(eventData, function(err,res) {
        if (err) throw err
        console.log('1 event inserted')
        db.close();
    })
}

module.exports = {
    recordEvent
}