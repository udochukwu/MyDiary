const queryUsersByEmail = 'SELECT * from users where email = $1 and password = $2';

const queryEntriesByUserId = 'SELECT * from entries where userId = $1 order by userId desc';

const queryEntriesByEntryId = 'SELECT * FROM entries WHERE userId = $1 AND entryId = $2';

const insertIntoUsers = 'INSERT INTO users(email, password) values($1, $2) RETURNING *';

const insertIntoEntries = 'INSERT INTO entries(userId, entryTitle, entryContent) values($1, $2, $3) RETURNING *';

const updateEntry = 'UPDATE entries SET entryTitle = $1, entryContent = $2 WHERE entryId = $3 AND userId = $4';

const deleteEntry = 'DELETE from entries where entryId = $1 AND userId = $2';


const Queries = {
  queryUsersByEmail,
  queryEntriesByUserId,
  queryEntriesByEntryId,
  insertIntoEntries,
  insertIntoUsers,
  updateEntry,
  deleteEntry
};

export default Queries;
