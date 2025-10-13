const database = require('./database');

/*
    THIS FILE IS NOW SIMPLIFIED - DATABASE INITIALIZATION IS HANDLED BY database.js
 */

function init_db() {
    console.log('Database initialization is handled automatically by the Database class');
    // La inicialización ahora se hace automáticamente cuando se importa database.js
    return Promise.resolve();
}

module.exports = init_db;