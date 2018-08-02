import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

// let tk = '';
chai.use(chaiHttp);

const user = {
  email: 'nnaji_udochukwu@yahoo.com',
  password: 'player009',
  confirmPassword: 'player009'
};
const randNum = Math.floor((Math.random() * 999999) + 1);
const newUser = {
  email: `randomuser${randNum}@yahoo.com`,
  password: 'player009',
  confirmPassword: 'player009'
};

// before((done) => {
//   chai.request(app)
//     .post('/api/v1/auth/signup').send(user)
//     .end((err, res) => {
//       expect(res).to.have.status(201);
//     });
//   chai.request(app)
//     .post('/api/v1/auth/login').send(user)
//     .end((err, res) => {
//       tk = res.body.token;
//       expect(res).to.have.status(200);
//       done();
//     });
// });

describe('Create a new user', () => {
  it('Should add a new user to the database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});


describe('Create a new user with an empty or invalid email address', () => {
  it('Should return error message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup').send({
        email: '',
        password: 'player009',
        confirmPassword: 'player009'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Create a new user with an empty password', () => {
  it('Should return error message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup').send({
        email: 'testuser@yahoo.com',
        password: '',
        confirmPassword: 'player009'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Create a new user with unmatching passwords', () => {
  it('Should return error message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup').send({
        email: 'testuser@yahoo.com',
        password: 'player008',
        confirmPassword: 'player009'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Sign in with wrong password', () => {
  it('Should return Invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login').send({
        email: 'nnaji_udochukwu@yahoo.com',
        password: 'wrongPassword',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Sign in with an empty email', () => {
  it('Should return error 400', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login').send({
        email: '',
        password: 'player009',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Sign in with an empty password', () => {
  it('Should return error 400', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login').send({
        email: 'nnaji_udochukwu@yahoo.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Get all diary entries for a specific user from database', () => {
  it('Should get user specific entries', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        tk = res.body.token;
        expect(res).to.have.status(200);
        done();
      });
    chai.request(app)
      .get('/api/v1/entries')
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Send a request with a wrong token', () => {
  it('Should return with a 403 error', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('x-access-token', 'Wrong Token')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});


describe('Get a specified entry from database', () => {
  it('Should get one specific entry by ID', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Create a New Entry', () => {
  it('Should add a new entry to the database', (done) => {
    chai.request(app)
      .post('/api/v1/entries').send({
        entryTitle: 'This is a new Entry Title',
        entryContent: 'This is a new entry content',
        dateTime: 'In the future',
      })
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('Create a New Entry With an empty entry title', () => {
  it('Should return an error with 400', (done) => {
    chai.request(app)
      .post('/api/v1/entries').send({
        entryTitle: '',
        entryContent: 'This is a new entry content',
        dateTime: 'In the future',
      })
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Create a New Entry With an empty entry content', () => {
  it('Should return an error with 400', (done) => {
    chai.request(app)
      .post('/api/v1/entries').send({
        entryTitle: 'This is a new entry title',
        entryContent: '',
        dateTime: 'In the future',
      })
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Modify an Entry', () => {
  it('Should modify the entry', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1').send({
        entryTitle: 'Updated Entry Title from test',
        entryContent: 'Updated Entry Content',
      })
      .set('x-access-token', tk)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('Get a non existing url/page', () => {
  it('Should return 404 for unknown routes', (done) => {
    chai.request(app)
      .get('/invalid/route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
