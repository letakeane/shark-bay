const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const domain = process.env.DOMAIN_ENV || 'localhost:1975';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('API endpoints tests', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => { done() })
  });

  beforeEach((done) => {
    console.log('RESEEDING TEST DATABASES');
    database.seed.run()
    .then(() => { done() })
  });

  // SHARKS ENDPOINTS TESTS

  it('should return all sharks, HAPPY PATH', (done) => {
    chai.request(server)
    .get('/api/v1/sharks')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(12);
      done();
    });
  })

  it('should return all sharks with specific id, HAPPY PATH', (done) => {
    chai.request(server)
    .get('/api/v1/sharks/3')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('name');
      response.body[0].name.should.equal('Fred');
      done();
    });
  })

  //ORDERS ENDPOINTS TESTS

  it('should return all orders, HAPPY PATH', (done) => {
    chai.request(server)
    .get('/api/v1/orders')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      done();
    });
  })

  it('should create a new order, HAPPY PATH', (done) => {
    chai.request(server)
    .post('/api/v1/orders')
    .set('Content-Type', 'application/json')
    .send({
      total_price: 99.99
    })
    .end((err, response) => {
      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('id');
      done();
    });
  });

  it('should create a new face, SAD PATH', (done) => {
    chai.request(server)
    .post('/api/v1/orders')
    .set('Content-Type', 'application/json')
    .end((err, response) => {
      response.should.have.status(406);
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      done();
    });
  });

});
