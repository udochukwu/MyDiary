'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
var dropEntriesTable = 'DROP TABLE IF EXISTS entries CASCADE;';

_dbConfig2.default.query(dropUsersTable, function (err) {
  if (err) {
    console.log('Could not dropTable Users ' + err);
  } else {
    console.log('Users table  was successfully Droped');
  }
  _dbConfig2.default.query(dropEntriesTable, function (err) {
    if (err) {
      console.log('Could not dropTableEntries ' + err);
    } else {
      console.log('Table Entries was successfully Droped');
    }
  });
});