
import db from './dbConfig';

// const dropTable = 'DROP TABLE IF EXISTS users CASCADE;';
const createTables = `CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    registerdOn TIMESTAMP)`;

db.query(createTables, (err) => {
  if (err) {
    console.log(`Could not create table ${err}`);
  }
  console.log('Table was successfully created');
});
