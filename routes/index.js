
require("../dbSetup.js")();

var express = require('express');
var router = express.Router();

var blogFacade = require("../facades/blogFacade");
var LocationBlog = require("../models/LocationBlog.js");
var userFacade = require("../facades/userFacade");
var User = require("../models/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Project' });
});


/* GET user by id page. */
router.get('/user/:userId', async function(req, res, next) {
  var userId = req.param("userId"); 
  var user = await userFacade.findById(userId);
  res.render('showuser', { title: 'Show all users', user: user });
});

/* GET all users page. */
router.get('/users', async function(req, res, next) {
  var users = await userFacade.getAllUsers();
  res.render('showusers', { title: 'Show all users', users: users });
});



module.exports = router;
