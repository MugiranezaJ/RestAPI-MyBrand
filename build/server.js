"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _security = require("./config/security.js");

var _models = _interopRequireDefault(require("./models/models.js"));

var _connection = require("./config/connection.js");

var _uploadHandler = require("./config/uploadHandler.js");

var _previlage = require("./config/previlage.js");

var _contacts = require("./routes/contacts.js");

var _newsletter = require("./routes/newsletter.js");

var _articles = require("./routes/articles.js");

var _coments = require("./routes/coments.js");

var _projects = require("./routes/projects.js");

var _skills = require("./routes/skills.js");

var _profile = require("./routes/profile.js");

var _password_reset = require("./routes/password_reset.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"]('public')); //console.log("directory: " + __dirname);
//console.log("cwd: " + process.cwd())
//var testFolder = __dirname + '/public/images/articles'
//fs.readdir(testFolder, (err, files) => {
//    files.forEach(file => {
//      console.log(file);
//    });
//  });

// get token
(0, _previlage.getToken)(app); //wellcome route

app.get('/', function (req, res) {
  res.send('Wellcome to Mjackson\'s restful Api');
}); // ########## CONTACTS ##########

// list all contacts
(0, _contacts.getContacts)(app); // add a new contact

(0, _contacts.createContact)(app); // ########## NEWSLETTER ##########

// list all newsletter
(0, _newsletter.news)(app); // create newsletter

(0, _newsletter.createNewsletter)(app); // ########## ARTICLES ##########

// view articles
(0, _articles.getArticles)(app); // Create article

(0, _articles.createArticle)(app); // Update article

(0, _articles.updateArticle)(app); // ########## ARTICLES ##########

// list all comments
(0, _coments.getComments)(app); //create comment

(0, _coments.createComment)(app); // ########## PROJECTS ##########

// view projects
(0, _projects.getProject)(app); // Create project

(0, _projects.createProject)(app); // ########## SKILLS ##########

// view skills
(0, _skills.getSkills)(app); // Create project

(0, _skills.createSkills)(app); // ########## PROFILE ##########

// view profile
(0, _profile.getProfile)(app); // reset profile

(0, _profile.resetProfile)(app); // update

(0, _profile.updateProfile)(app); // ########## ADMIN ##########

// admin
(0, _password_reset.resetPasword)(app);
var server = app.listen(_connection.port, function () {
  console.log('Server started at port ' + _connection.port);
});
var _default = app;
exports["default"] = _default;