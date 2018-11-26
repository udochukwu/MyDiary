'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserTable = 'CREATE TABLE users(\n    userId SERIAL PRIMARY KEY,\n    email VARCHAR(40) UNIQUE NOT NULL,\n    password VARCHAR(40) NOT NULL,\n    registerdOn TIMESTAMP default current_timestamp)';

var createEntriesTable = 'CREATE TABLE entries(\n      entryId SERIAL,\n      userId INT NOT NULL \n      REFERENCES users(userId) ON DELETE CASCADE,\n      entryTitle VARCHAR(100) NOT NULL,\n      entryContent TEXT NOT NULL,\n      dateTime TIMESTAMP NOT NULL default current_timestamp,\n      PRIMARY KEY (userId,entryId))';

_dbConfig2.default.query(createUserTable, function (err) {
  if (err) {
    console.log('Could not create table ' + err);
  }
  _dbConfig2.default.query(createEntriesTable, function (err) {
    if (err) {
      console.log('Could not create  entries table  ' + err);
    } else {
      console.log('Tables was successfully created');
    }
  });
});