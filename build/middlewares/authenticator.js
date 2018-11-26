'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  generateToken: function generateToken(user) {
    var token = _jsonwebtoken2.default.sign({ user: user }, process.env.JWTKEY, { expiresIn: '48h' });
    return token;
  },
  checkToken: function checkToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        success: false,
        message: 'Missing Token'
      });
    } else {
      _jsonwebtoken2.default.verify(token, process.env.JWTKEY, function (err, decoded) {
        if (err) {
          if (err.message.includes('signature')) {
            res.status(403).json({
              message: 'Invalid token supplied'
            });
          } else {
            res.status(403).json({
              message: err
            });
          }
        }
        req.user = decoded.user;

        next();
      });
    }
  }
};