
import db from './dbConfig';

const dropTables = 'DROP TABLE IF EXISTS users CASCADE;';

db.query(dropTables, (err) => {
  if (err) {
    console.log(`Could not dropTables ${err}`);
  }
  console.log('Table was successfully Droped');
});
