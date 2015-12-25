const low = require('lowdb');
const storage = require('lowdb/file-async');

const db = low('db.json', { storage });

module.exports = db;
