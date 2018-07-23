import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

describe('API Endpoints testing', () => {
  describe('GET /', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should return 404 for unknown routes', (done) => {
      chai.request(app)
        .get('/invalid/route')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('Get entries', () => {
  it('Should get all entries', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Should get one entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Create New Entry', () => {
  const newEntry = {
    entryTitle: 'This is a new Entry Title',
    entryContent: 'This is a new entry content',
    dateTime: 'In the future',
    userId: 100
  };
  it('Should add an entry', (done) => {
    chai.request(app)
      .post('/api/v1/entries').send(newEntry)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Should edit the entry', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1').send({
        entryTitle: 'Updated Entry Title',
        entryContent: 'Updated Entry Content',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
