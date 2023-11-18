const {MongoClient} = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const eventCollection = db.collection('event');
const waagCollection = db.collection('waag');
const userCollection = db.collection('user');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1});
})().catch((ex) => {
    console.log(`unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function addEvent(event) {
    const result = await eventCollection.insertOne(event);
    return result;
}

async function addWaag(waag) {
    const result = await waagCollection.insertOne(waag);
    return result;
}

function getSchedule() {
    return eventCollection.find().toArray();
}
async function deleteEvent() {
    const deleteResult = await eventCollection.deleteOne()
}
function getWaag() {
    return waagCollection.find().toArray();
}

module.exports = {addEvent, addWaag, getWaag, getSchedule};


