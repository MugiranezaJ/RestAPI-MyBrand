"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSkills = createSkills;
exports.getSkills = getSkills;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _uploadHandler = require("../config/uploadHandler.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errorHandler = require("../config/errorHandler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// list skills
function createSkills(app) {
  app.post('/api/skills/add', _security.verifyToken, _uploadHandler.upload.single('skill_image'), function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.log(err);
        res.send('Status 403');
      } else {
        var file = req.file;
        console.log(req.file);

        if (!file) {
          var error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return next(error);
        }

        _models.skillsModel.create({
          Title: req.body.title,
          SkillImage: '/images/skills/' + file.filename,
          //Description : 'A portfolio website where i can meet with my clients',
          SkillDate: new Date()
        }, function (err, skill) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(skill);
            console.log('skills created');
          }
        });
      }
    });
  });
}

function getSkills(app) {
  app.get('/api/skills/view', function (req, res) {
    var id = req.query.id;
    console.log('id:' + id);

    if (id) {
      _models.skillsModel.findById(id, function (err, skillsData) {
        if (err) {
          res.send(err);
        }

        res.json(skillsData);
      });
    } else {
      models.skillsModel.find(function (err, skills) {
        if (err) res.send(err);
        res.json(skills);
        console.log('projects returned');
      });
    }
  });
}