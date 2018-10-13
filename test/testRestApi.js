const expect = require("chai").expect;


describe('app', function(){
    var app = require('../app');
    beforeEach(function(){
      app.listen(3000);
    });

    afterEach(function(){
      app.close();
    })
  });