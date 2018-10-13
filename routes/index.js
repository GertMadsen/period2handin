
require("../dbSetup.js")();

var express = require('express');
var router = express.Router();

var blogFacade = require("../facades/blogFacade");
// var LocationBlog = require("../models/LocationBlog.js");
var userFacade = require("../facades/userFacade");
// var User = require("../models/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Project REST API' });
});

/* GET all users page. */
router.get('/users', async function(req, res, next) {
  var users = await userFacade.getAllUsers();
  res.render('jsonview', { title: 'Show all users', jsonStr: users });
});

/* GET user by id page. */
router.get('/user/:userId', async function(req, res, next) {
  var userId = req.param("userId"); 
  var user = await userFacade.findById(userId);
  res.render('jsonview', { title: 'Show user by id', jsonStr: user });
});

/* GET all blogs page. */
router.get('/locationblogs', async function(req, res, next) {
  var users = await blogFacade.getAllBlogs();
  res.render('jsonview', { title: 'Show all users', jsonStr: users });
});

/* GET blog by id page. */
router.get('/locationblog/:blogId', async function(req, res, next) {
  var blogId = req.param("blogId"); 
  var blog = await blogFacade.findById(blogId);
  res.render('jsonview', { title: 'Show blog by id', jsonStr: blog });
});

module.exports = router;
