
import db from './dbConfig';

// const dropTable = 'DROP TABLE IF EXISTS users CASCADE;';
const createUserTable = `CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    registerdOn TIMESTAMP)`;

const createEntriesTable = `CREATE TABLE entries(
      entryId SERIAL,
      userId INT NOT NULL 
      REFERENCES users(userId) ON DELETE CASCADE,
      entryTitle VARCHAR(40) NOT NULL,
      entryContent TEXT NOT NULL,
      dateTime TIMESTAMP NOT NULL,
      PRIMARY KEY (userId,entryId))`;

db.query(createUserTable, (err) => {
  if (err) {
    console.log(`Could not create table ${err}`);
  }
  db.query(createEntriesTable, (err) => {
    if (err) {
      console.log(`Could not create  entries table  ${err}`);
    } else {
      console.log('Tables was successfully created');
    }
  });
});
