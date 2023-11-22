const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
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

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token});
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}



async function addEvent(event) {
    const result = await eventCollection.insertOne(event);
    return result;
}


async function deleteEvent(event) {
    const result = await eventCollection.deleteOne(event);
    return result;
}


async function addWaag(waag) {
    const result = await waagCollection.insertOne(waag);
    return result;
}

async function deleteWaag(waag) {
    const result = await waagCollection.deleteOne(waag);
    return result;
}

function getSchedule() {
    return eventCollection.find().toArray();
}


function getWaag() {
    return waagCollection.find().toArray();
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addEvent, 
    addWaag, 
    getWaag, 
    getSchedule,
    deleteEvent,
    deleteWaag,
};


