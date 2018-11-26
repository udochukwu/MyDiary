'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());

app.use('/api/v1', _routes2.default);

app.get('/', function (req, res) {
  res.status(200).send('Welcome to MyDiary App');
});

app.get('*', function (req, res) {
  return res.status(404).send({
    message: 'Page Not Found.'
  });
});

var port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
module.exports = app;