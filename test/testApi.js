const expect = require("chai").expect;
const request = require('request');
const http = require('http')
const app = require('../app');

var server = null;
const TEST_PORT = 3456;
var USER_ID = null;
var BLOG_ID = null;

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
      expect(body[0].firstName).to.be.equal("Kurt");
      expect(body.length).to.be.equal(4);
      USER_ID = body[0]._id;
      done()
    })
  });

  it('Testing /user/<id> REST endpoint', function (done) {
    const options = {
      url: 'http://localhost:' + TEST_PORT + '/user/'+ USER_ID,
      method: 'GET',
      json: true
    };
     request(options, function (error, res, body) {
      expect(body.userName).to.be.equal("kw");
      done()
    })
  });

  it('Testing /locationblogs REST endpoint', function (done) {
    const options = {
      url: 'http://localhost:' + TEST_PORT + '/locationblogs',
      method: 'GET',
      json: true
    };

     request(options, function (error, res, body) {
      expect(body[0].info).to.be.equal("Cool Place");
      expect(body.length).to.be.equal(4);
      BLOG_ID = body[0]._id;
      done()
    })
  });

  it('Testing /locationblog/<id> REST endpoint', function (done) {
    const options = {
      url: 'http://localhost:' + TEST_PORT + '/locationblog/' + BLOG_ID,
      method: 'GET',
      json: true
    };

     request(options, function (error, res, body) {
      expect(body.info).to.be.equal("Cool Place");
      expect(body.pos.longitude).to.be.equal(26);      
      expect(body.pos.latitude).to.be.equal(28);      
      done()
    })
  });

  after(function (done) {
    server.close();
    done();
  });
});