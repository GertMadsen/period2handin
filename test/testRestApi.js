const expect = require("chai").expect;
const request = require('request');
const http = require('http')
const app = require('../app');

var server = null;
const TEST_PORT = 3456;


describe('Testing REST API', function () {
  before(function (done) {
    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
      done();
    });
  });

  it('Testing server connection', function () {
    expect(server.listening).to.be.true;
  });

  it('Testing /users REST endpoint', function (done) {
    const options = {
      url: 'http://localhost:' + TEST_PORT + '/users',
      method: 'GET',
      json: true
    };

     request(options, function (error, res, body) {
      console.log(body[0].firstName);
      done()
    })
  });


  after(function (done) {
    server.close();
    done();
  });
});