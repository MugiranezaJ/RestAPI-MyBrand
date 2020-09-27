"use strict";

//import { app } from '../server';
var assert = require('assert');

var request = require('supertest');

var app = require('../server');

var models = require('../models/models'); //app.use('/', index)


var articleModel = models.articlesModel;
var article = new articleModel({
  Title: "1Hey there (test)",
  FeaturedImage: "sampleImage.jpg",
  Description: "yoy yo coooooooool"
}); //console.log(article)

before(function (done) {
  var articleFroDelete = new articleModel({
    Title: "Article for delete",
    FeaturedImage: "sampleImageForDelete.jpg",
    Description: "being deleted"
  });
  articleFroDelete.save().then(function () {
    assert(article.isNew === false);
  });
  done();
});
describe('Server*', function () {
  it('should say hello', function (done) {
    assert.equal('hello', 'hello');
    done();
  });
  describe('Articles', function () {
    it('should insert an article', function (done) {
      article.save().then(function () {
        assert(article.isNew === false);
      });
      done();
    });
    it('should delete article', function (done) {
      articleModel.findOneAndRemove({
        Title: "Article for delete"
      }, {
        useFindAndModify: false
      }).then(function () {
        articleModel.findOne({
          Title: "Article for delete"
        }).then(function (result) {
          console.log("result:" + result);
          assert(result === null);
        });
      });
      done();
    });
    it('should view an article');
    it('should view all articles', function (done) {
      request(app.server).get('/api/articles/view').expect(200, done) //.end((err, res) => {
      //    res.ex
      //})
      //.catch((error) => {
      //    assert.strictEqual(error,'Promise error');
      //done();
      //  })
      .then(done()); //done()
    });
    it('should update an article');
  });
  describe('Contacts', function () {
    it('shoild insert a contact');
    it('should delete a contact');
    it('should view a contact');
    it('should view all contacts');
  });
  describe('Newsletter', function () {
    it('shoild insert a newsletter');
    it('should delete a newsletter');
    it('should view a newsletter');
    it('should view all newsletters');
  });
  describe('Projects', function () {
    it('shoild insert a project');
    it('should delete a project');
    it('should view a project');
    it('should view all projects');
    it('should update a project');
  });
  describe('Skills', function () {
    it('shoild insert a skills');
    it('should delete a skills');
    it('should view a skills');
    it('should view all skills');
    it('should update a skills');
  });
  describe('Profile', function () {
    //it('shoild insert a skills')
    //it('should delete a skills')
    it('should view a profile'); //it('should view all skills')

    it('should update a profile');
  }); //it('should return all contacts')
  //it('should return all newsletters')
  //it('should return profile information')

  describe('Deleting', function () {});
  describe('Routing', function () {});
}); //console.log(app)