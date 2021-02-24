'use strict';

const { server } = require ('../src/server.js');
const supertest = require ('supertest');
const requestTest = supertest(server); // PER DEMO -- SUPERTEST TAKES IN SERVER TO BE RAN DURING TESTING

// DESCRIBE -- TEST SUITE
describe('**** API SERVER ****', () => {

  //IT -- ACTUAL ASSERTIONS
  it('should respond with a 500 on a server error', () => {
    requestTest.get('/bad-route')
    .then(results => {
      expect(results.status).toBe(500);
    })
  });

  it('should respond with a 404 not found', () => {
    requestTest.get('not-a-route')
    .then(results => {
      expect(results.status).toBe(400);
    })
  });
})