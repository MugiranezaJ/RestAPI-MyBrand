"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasword = resetPasword;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errorHandler = require("../config/errorHandler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// password reset
function resetPasword(app) {
  app.post('/api/admin/reset_password', _security.verifyToken, function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.log(err);
        res.send('Status 403');
      } else {
        id = '5f62e91b84f2ac52061c0f35';

        _models.adminModel.findById(id, function (err, adminData) {
          //adminData.toObject()
          console.log(adminData.Password);
          var currentPassword = adminData.Password;
          var oldPassword = req.body.oldPassword;
          var newpassword = req.body.newPassword;
          console.log(oldPassword + " " + currentPassword);

          if (currentPassword != oldPassword) {
            res.json({
              status: 4,
              message: 'old password is incollect'
            });
          } else {
            var data = {
              Password: newpassword,
              UpdatedTime: new Date()
            };

            _models.adminModel.findByIdAndUpdate(id, data, function (err, admin) {
              if (err) throw res.json((0, _errorHandler.parserError)(err));
              res.json({
                body: 'name-' + admin,
                status: 7,
                message: 'updated successfully',
                authData: authData
              });
            });
          }
        });
      }
    });
  });
}