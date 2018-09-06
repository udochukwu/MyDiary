
import db from './dbConfig';

const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropEntriesTable = 'DROP TABLE IF EXISTS entries CASCADE;';


db.query(dropUsersTable, (err) => {
  if (err) {
    console.log(`Could not dropTable Users ${err}`);
  }else{
    console.log('Users table  was successfully Droped');
  }
  db.query(dropEntriesTable, (err) => {
    if (err) {
      console.log(`Could not dropTableEntries ${err}`);
    }else{
      console.log('Table Entries was successfully Droped');
    }
  });
});
