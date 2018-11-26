'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authenticator = require('../middlewares/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _dbConfig = require('../db/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generateToken = _authenticator2.default.generateToken;
var insertIntoUsers = _queries2.default.insertIntoUsers,
    queryUsersByEmail = _queries2.default.queryUsersByEmail;

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'login',
    value: function login(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      _dbConfig2.default.query(queryUsersByEmail, [email, password], function (err, dbRes) {
        var errors = {};
        if (err) {
          errors.unknown = 'Cannot signup at the moment';
          return res.json({ success: false, err: err, errors: errors });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount !== 1) {
          errors.email = 'Incorrect Email or password';
          return res.status(401).json({ success: false, errors: errors });
        }
        var user = rows[0];
        var userid = rows[0].userid;

        var token = generateToken({ email: email, userid: userid });
        res.status(200).json({
          success: true, message: 'User successfully Logged In', user: user, token: token
        });
      });
    }
  }, {
    key: 'register',
    value: function register(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _dbConfig2.default.query(insertIntoUsers, [email, password], function (err, dbRes) {
        if (err) {
          var errors = {};
          if (err.code !== '23505') {
            errors.unknown = 'Cannot signup at the moment';
            return res.json({ message: 'Could not post data', err: err, errors: errors });
          }
          errors.email = 'Email Address Already Exists on our database';
          return res.status(409).json({ success: false, message: 'Email Address Already Exists on our database', errors: errors });
        }
        var rows = dbRes.rows;

        var user = rows[0];
        var userid = rows[0].userid;


        var token = generateToken({ email: email, userid: userid });
        return res.status(201).json({
          success: true, message: 'User successfully Registerd', user: user, token: token
        });
      });
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;