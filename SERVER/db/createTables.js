
import db from './dbConfig';


db.query('CREATE TABLE users(userId SERIAL PRIMARY KEY, email VARCHAR(40) UNIQUE NOT NULL, password VARCHAR(40) NOT NULL,registerdOn TIMESTAMP);', (err) => {
  if (err) {
    console.log(`Could not create  table users ${err}`);
  } else {
    console.log('Users Table was successfully Created');
  }
});

db.query('CREATE TABLE entries(entryId SERIAL, userId INT NOT NULL REFERENCES users(userId) ON DELETE CASCADE, entryTitle VARCHAR(40) NOT NULL, entryContent TEXT NOT NULL, dateTime TIMESTAMP NOT NULL, PRIMARY KEY (userId,entryId));', (err) => {
  if (err) {
    console.log(`Could not create  table entris  ${err}`);
  } else {
    console.log('Entries Table was successfully created');
  }
});
