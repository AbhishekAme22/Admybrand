const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'admybrand22',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Execute a MySQL query
function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  executeQuery,
};
