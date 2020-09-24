"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;

var _multer = _interopRequireDefault(require("multer"));

require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// SET STORAGE
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    //var fieldname = file.fieldname
    //console.log(file.fieldname == 'project_image')
    if (file.fieldname == 'article_image') {
      cb(null, process.cwd() + '/public/images/articles');
    } else if (file.fieldname == 'project_image') {
      cb(null, process.cwd() + '/public/images/projects');
    } else if (file.fieldname == 'skill_image') {
      cb(null, process.cwd() + '/public/images/skills');
    } else if (file.fieldname == 'profile_image') {
      cb(null, process.cwd() + '/public/images/profile');
    } else {
      console.log('fieldname not maching');
    }
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
exports.upload = upload;