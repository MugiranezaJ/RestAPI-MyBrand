"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;

var _security = require("../config/security.js");

var _models = require("../models/models.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import bodyParser from 'body-parser'
function getToken(app) {
  app.post('/api/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password; //console.log(email + " : " + password);

    var User = {
      Email: req.body.email,
      Password: req.body.password
    };

    _models.adminModel.findOne(User, function (err, user) {
      //console.log(user);
      if (user) {
        _jsonwebtoken["default"].sign({
          user: user
        }, 'secretKey', function (err, token) {
          res.json({
            token: token
          });
        });
      } else {
        res.json({
          statusCode: -1,
          message: "user does not exist"
        });
      }
    });
  });
}