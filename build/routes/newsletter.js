"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.news = news;
exports.createNewsletter = createNewsletter;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _errorHandler = require("../config/errorHandler.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// list all newsletter
function news(app) {
  app.get('/api/newsletter/view', function (req, res) {
    _models.newsletterModel.find(function (err, emailInfo) {
      if (err) res.send(err);
      res.json(emailInfo);
      console.log('Newletter returned');
    });
  });
} // Create newsletter


function createNewsletter(app) {
  app.post('/api/newsletter/add', _security.verifyToken, function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.log(err);
        res.send('Status 403');
      } else {
        console.log(req.body.email);

        _models.newsletterModel.create({
          //Name : 'Mj',
          Email: req.body.email,
          //Message : 'Cool',
          RequestDate: new Date()
        }, function (err, emailInfo) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(emailInfo);
            console.log('Newsletter created');
          }
        });
      }
    });
  });
}