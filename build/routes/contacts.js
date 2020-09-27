"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContacts = getContacts;
exports.createContact = createContact;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _errorHandler = require("../config/errorHandler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// list all contacts
function getContacts(app) {
  app.get('/api/contacts/view', function (req, res) {
    _models.contactsModel.find(function (err, contacts) {
      if (err) res.send(err);
      res.json(contacts);
      console.log('Contacts returned');
    });
  });
} // create a new contact


function createContact(app) {
  //app.use(bodyParser.json())
  app.post('/api/contacts/add', _security.verifyToken, function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.log(err);
        res.send('Status 403');
      } else {
        _models.contactsModel.create({
          Name: req.body.name,
          Email: req.body.email,
          Message: req.body.message,
          ContactDate: new Date()
        }, function (err, Contact) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(Contact);
            console.log('Contact created');
          }
        });
      }
    });
  });
}