const pg = require('pg');

// Setting up pg to connect to the database
// Creating todo database pool
const pool = new pg.Pool({
    database: 'weekend_to_do_app',
    host: 'localhost',
    port: 5432
});

// Exporting pool for use in server
module.exports = pool