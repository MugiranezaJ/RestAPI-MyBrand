"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.resetProfile = resetProfile;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _uploadHandler = require("../config/uploadHandler.js");

var _errorHandler = require("../config/errorHandler.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// view profile
function getProfile(app) {
  app.get('/api/profile/view', function (req, res) {
    _models.profileModel.find(function (err, profile) {
      if (err) res.send(err);
      res.json(profile);
      console.log('Contacts returned');
    });
  });
} // update profile


function updateProfile(app) {
  app.post('/api/profile/update', _security.verifyToken, _uploadHandler.upload.single('profile_image'), function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var file = req.file;
        var id = '5f602ed39e589c5d5cdea5a7';
        var data = {
          Name: req.body.name,
          Caption: req.body.caption,
          ProfileImage: '/images/profile/' + file.filename,
          About: req.body.about,
          UpdatedTime: new Date()
        };
        console.log(req.file);

        if (!file) {
          var error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return next(error);
        }

        res.setHeader('Content-Type', 'application/json');
        models.profileModel.findByIdAndUpdate(id, data, function (err, profile) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(profile);
            console.log('profile updated');
          }
        });
      }
    });
  });
} // reset profile


function resetProfile(app) {
  app.post('/api/profile/reset', function (req, res) {
    _models.profileModel.create({
      Name: 'Mj',
      Caption: 'mj@gmail.com',
      ProfileImage: 'profile/user.png',
      About: 'Cool',
      UpdatedTime: new Date()
    }, function (err, profile) {
      if (err) {
        res.send(err);
      } else {
        res.json(profile);
        console.log('profile reset');
      }
    });
  });
}