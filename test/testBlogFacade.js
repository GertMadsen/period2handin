const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("..//dbSetup");

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

var blogFacade = require("../facades/blogFacade");
var LocationBlog = require("../models/LocationBlog.js");
var User = require("../models/user");

let connection = null;
describe("Testing the Blog Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    await dbSetup(require("../settings").TEST_DB_URI);
  })

  after(function () {
    mongoose.connection.close();
  })

  var users = [];
  var blogs = [];
  /* Setup the database in a known state (2 users) before EACH test */
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    await LocationBlog.deleteMany({}).exec();    
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
    ])
    blogs = await Promise.all([
      new LocationBlog({ info: "Cool Place", pos: { longitude: 26, latitude: 28 }, author: users[0]._id }).save(),
      new LocationBlog({ info: "Another Cool Place", pos: { longitude: 56, latitude: 56 }, author: users[0]._id }).save(),
    ])
  })

  it("Should find all blogs (Cool Place and Another Cool Place)", async function () {
    var blogs = await blogFacade.getAllBlogs();
    expect(blogs.length).to.be.equal(2);
  });

  it("Should add Yet Another Cool Place", async function () {
    var blog = await blogFacade.addBlog("Yet Another Cool Place", users[0]._id, 28, 56);
    expect(blog).to.not.be.null;
    expect(blog.info).to.be.equal("Yet Another Cool Place");
    var blogs = await blogFacade.getAllBlogs();
    expect(blogs.length).to.be.equal(3);
  });

  it("Should Find Cool Place by ID", async function () {
    var blog = await blogFacade.findById(blogs[0]._id);
    expect(blog.info).to.be.equal("Cool Place");
  });

  it("Kurt and Hanne should like Cool Place", async function () {
    await blogFacade.likeLocationBlog(blogs[0]._id,users[0]._id);      
    var blog = await blogFacade.likeLocationBlog(blogs[0]._id,users[1]._id);
    expect(blog.likedByCount).to.be.equal(2);
  });


})