"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComments = getComments;
exports.createComment = createComment;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// list all contacts
function getComments(app) {
  app.get('/api/comments/view', function (req, res) {
    var commentsContainer = [];
    var counter = 0;
    var commentsProjection = {
      //_id: false,
      Comments: true
    };

    _models.articlesModel.find({}, commentsProjection, function (err, comments) {
      if (err) res.send(err); //console.log(comments);

      comments.forEach(function (doc) {
        //console.log(doc.Comments);
        doc.Comments.forEach(function (docs) {
          if (docs.Username) {
            commentsContainer.push(docs);
            counter += 1;
          }
        });
      }); //console.log(commentsContainer);

      commentsContainer.push({
        "size": counter
      });
      res.json(commentsContainer);
      console.log('Comments returned');
    });
  });
} // create a new contact


function createComment(app) {
  app.post('/api/comments/add', _security.verifyToken, function (req, res) {
    var id = req.query.id;

    if (!id) {
      res.json({
        message: "post id error"
      });
    } else {
      var commentData = [{
        Username: req.body.username,
        Email: req.body.email,
        Comment: req.body.comment,
        CommentDate: new Date()
      }];

      _models.articlesModel.findByIdAndUpdate(id, {
        //$push: {"Comments":commentData}}, {upsert: true
        $push: {
          "Comments": commentData
        }
      }, function (err, comment) {
        if (err) {
          res.json(err);
        } else {
          res.json(comment);
          console.log('Comment created');
        }
      });
    }
  });
}