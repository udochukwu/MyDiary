
import db from './dbConfig';


db.query('TRUNCATE users CASCADE;', (err) => {
  if (err) {
    console.log(`Could not truncate table ${err}`);
  }
  console.log('Table was successfully truncated');
});
