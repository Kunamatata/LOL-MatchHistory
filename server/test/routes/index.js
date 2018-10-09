var supertest = require('supertest');
var chai = require('chai');
var app = require('../../server.js');

// describe('GET /jobs', function() {
//   it('returns a list of jobs', function(done) {
//     request.get('/jobs').expect(200).end((err, res) => {
//       const { jobs } = res.body;
//       expect(res.body.jobs.length > 0)
//       done();
//     })
//   })
// })