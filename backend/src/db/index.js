const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  // host: 'host.docker.internal',
  database: 'top-5-movies',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
