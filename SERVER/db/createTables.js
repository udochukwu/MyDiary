
import db from './dbConfig';

const createUserTable = `CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    registerdOn TIMESTAMP default current_timestamp)`;

const createEntriesTable = `CREATE TABLE entries(
      entryId SERIAL,
      userId INT NOT NULL 
      REFERENCES users(userId) ON DELETE CASCADE,
      entryTitle VARCHAR(100) NOT NULL,
      entryContent TEXT NOT NULL,
      dateTime TIMESTAMP NOT NULL default current_timestamp,
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
