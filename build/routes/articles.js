"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticles = getArticles;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;

var _models = require("../models/models.js");

var _security = require("../config/security.js");

var _uploadHandler = require("../config/uploadHandler.js");

var _errorHandler = require("../config/errorHandler.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getArticles(app) {
  // view articles
  app.get('/api/articles/view', function (req, res) {
    var id = req.query.id;
    console.log('id:' + id);

    if (id) {
      _models.articlesModel.findById(id, function (err, articleData) {
        if (err) {
          res.send(err);
        }

        res.send(articleData);
      });
    } else {
      _models.articlesModel.find(function (err, articles) {
        if (err) res.send(err);
        res.json(articles);
        console.log('Articles returned');
      });
    }
  });
} // create an article


function createArticle(app) {
  app.post('/api/articles/add', _security.verifyToken, _uploadHandler.upload.single('article_image'), function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.error(err);
        res.send('status 403');
      } else {
        var file = req.file;
        console.log(req.file);

        if (!file) {
          var error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return next(error);
        }

        res.setHeader('Content-Type', 'application/json');

        _models.articlesModel.create({
          Title: req.body.title
          /*'NodeJS, Express, MongoDB and Mongoose'*/
          ,
          FeaturedImage: '/images/articles/' + req.file.filename
          /*'images/kbs.jpg'*/
          ,
          Description: req.body.description
          /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/
          ,
          PostDate: new Date()
        }, function (err, article) {
          if (err) {
            res.json((0, _errorHandler.parserError)(err));
          } else {
            res.json(article);
            console.log('article created');
          }
        });
      }
    });
  });
} //update an article


function updateArticle(app) {
  app.post('/api/articles/update', _security.verifyToken, _uploadHandler.upload.single('article_image'), function (req, res) {
    _jsonwebtoken["default"].verify(req.token, 'secretKey', function (err, authData) {
      if (err) {
        console.error(err);
        res.send('status 403');
      } else {
        var file = req.file;
        console.log(req.file);
        var id = req.body.id;

        if (!file) {
          //const error = new Error('Please upload a file')
          //error.httpStatusCode = 400
          //return next(error)
          var data = {
            Title: req.body.title
            /*'NodeJS, Express, MongoDB and Mongoose'*/
            ,
            //FeaturedImage : '/images/articles/' + req.file.filename /*'images/kbs.jpg'*/,
            Description: req.body.description
            /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/
            ,
            PostDate: new Date()
          };
          res.setHeader('Content-Type', 'application/json');

          _models.articlesModel.findByIdAndUpdate(id, data, function (err, article) {
            if (err) {
              res.send(err);
            } else {
              res.json(article);
              console.log('article Updated');
            }
          });
        } else {
          var data = {
            Title: req.body.title
            /*'NodeJS, Express, MongoDB and Mongoose'*/
            ,
            FeaturedImage: '/images/articles/' + req.file.filename
            /*'images/kbs.jpg'*/
            ,
            Description: req.body.description
            /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/
            ,
            PostDate: new Date()
          };
          res.setHeader('Content-Type', 'application/json');

          _models.articlesModel.findByIdAndUpdate(id, data, function (err, article) {
            if (err) {
              res.send(err);
            } else {
              res.json(article);
              console.log('article Updated');
            }
          });
        }
      }
    });
  });
}