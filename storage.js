const low = require('lowdb');
const storage = require('lowdb/file-async');

const db = low('db.json', { storage });

if (!db.object.$) {
    db.object.$ = {};
}

db.data = db.object.$;
db.save = db.write;

module.exports = db;
