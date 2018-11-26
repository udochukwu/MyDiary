'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tk = '';
_chai2.default.use(_chaiHttp2.default);

var user = {
  email: 'nnaji_udochukwu@yahoo.com',
  password: 'player009',
  confirmPassword: 'player009'
};
describe('Create a new user', function () {
  it('Should add a new user to the database', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
});

describe('Sign up with an already existing email', function () {
  it('Should add a new user to the database', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(409);
      done();
    });
  });
});

describe('Sign in', function () {
  it('Should return Invalid credentials', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      tk = res.body.token;
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

describe('Create a new user with an empty or invalid email address', function () {
  it('Should return error message', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      email: '',
      password: 'player009',
      confirmPassword: 'player009'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Create a new user with an empty password', function () {
  it('Should return error message', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      email: 'testuser@yahoo.com',
      password: '',
      confirmPassword: 'player009'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Create a new user with unmatching passwords', function () {
  it('Should return error message', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send({
      email: 'testuser@yahoo.com',
      password: 'player008',
      confirmPassword: 'player009'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Sign in with wrong password', function () {
  it('Should return Invalid credentials', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
      email: 'nnaji_udochukwu@yahoo.com',
      password: 'wrongPassword'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(401);
      done();
    });
  });
});

describe('Sign in with an empty email', function () {
  it('Should return error 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
      email: '',
      password: 'player009'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Sign in with an empty password', function () {
  it('Should return error 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
      email: 'nnaji_udochukwu@yahoo.com',
      password: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Create a New Entry', function () {
  it('Should add a new entry to the database', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/entries').send({
      entryTitle: 'This is a new Entry Title',
      entryContent: 'This is a new entry content',
      dateTime: 'In the future'
    }).set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
});

describe('Get all diary entries for a specific user from database', function () {
  it('Should get user specific entries', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      tk = res.body.token;
      (0, _chai.expect)(res).to.have.status(200);
    });
    _chai2.default.request(_app2.default).get('/api/v1/entries').set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

describe('Get a specified entry from database', function () {
  it('Should get one specific entry by ID', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/entries/1').set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});

describe('Make a request without defining x-access-token', function () {
  it('Should Make a request without defining x-access-token', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/entries/1').set('no-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(403);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});

describe('Get a non-existing entry from database', function () {
  it('Should return an error 404 ', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/entries/12345').set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});

describe('Create a New Entry With an empty entry title', function () {
  it('Should return an error with 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/entries').send({
      entryTitle: '',
      entryContent: 'This is a new entry content',
      dateTime: 'In the future'
    }).set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Create a New Entry With an empty entry content', function () {
  it('Should return an error with 400', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/entries').send({
      entryTitle: 'This is a new entry title',
      entryContent: '',
      dateTime: 'In the future'
    }).set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      done();
    });
  });
});

describe('Modify an Entry', function () {
  it('Should modify the entry', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/entries/1').send({
      entryTitle: 'Updated Entry Title from test',
      entryContent: 'Updated Entry Content'
    }).set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

describe('Delete an Entry', function () {
  it('Should Delete the entry', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/entries/1').set('x-access-token', tk).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

describe('Get a non existing url/page', function () {
  it('Should return 404 for unknown routes', function (done) {
    _chai2.default.request(_app2.default).get('/invalid/route').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});

describe('Get to the homepage ', function () {
  it('Should return 200 for homepage', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});