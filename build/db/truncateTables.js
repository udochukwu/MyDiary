'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dbConfig2.default.query('TRUNCATE users CASCADE;', function (err) {
  if (err) {
    console.log('Could not truncate table ' + err);
  }
  console.log('Table was successfully truncated');
});