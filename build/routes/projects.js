"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProject = createProject;
exports.getProject = getProject;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _uploadHandler = require("../config/uploadHandler.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errorHandler = require("../config/errorHandler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// create project
function createProject(app) {
  app.post('/api/projects/add', _security.verifyToken, _uploadHandler.upload.single('project_image'), function (req, res) {
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

        res.setHeader('Content-Type', 'application/json');

        _models.projectsModel.create({
          Title: req.body.title,
          ProjectImage: '/images/projects/' + file.filename,
          Description: req.body.description,
          projectsDate: new Date()
        }, function (err, project) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(project);
            console.log('project created');
          }
        });
      }
    });
  });
} // list all projects


function getProject(app) {
  app.get('/api/projects/view', function (req, res) {
    var id = req.query.id;
    console.log('id:' + id);

    if (id) {
      _models.projectsModel.findById(id, function (err, projectData) {
        if (err) {
          res.send(err);
        }

        res.json(projectData);
      });
    } else {
      _models.projectsModel.find(function (err, projects) {
        if (err) res.send(err);
        res.json(projects);
        console.log('projects returned');
      });
    }
  });
}