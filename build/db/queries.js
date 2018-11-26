'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var queryUsersByEmail = 'SELECT * from users where email = $1 and password = $2';

var queryEntriesByUserId = 'SELECT * from entries where userId = $1 order by userId desc';

var queryEntriesByEntryId = 'SELECT * FROM entries WHERE userId = $1 AND entryId = $2';

var insertIntoUsers = 'INSERT INTO users(email, password) values($1, $2) RETURNING *';

var insertIntoEntries = 'INSERT INTO entries(userId, entryTitle, entryContent) values($1, $2, $3) RETURNING *';

var updateEntry = 'UPDATE entries SET entryTitle = $1, entryContent = $2 WHERE entryId = $3 AND userId = $4';

var deleteEntry = 'DELETE from entries where entryId = $1 AND userId = $2';

var Queries = {
  queryUsersByEmail: queryUsersByEmail,
  queryEntriesByUserId: queryEntriesByUserId,
  queryEntriesByEntryId: queryEntriesByEntryId,
  insertIntoEntries: insertIntoEntries,
  insertIntoUsers: insertIntoUsers,
  updateEntry: updateEntry,
  deleteEntry: deleteEntry
};

exports.default = Queries;