import assert from 'assert'
import path from 'path'
import chai from 'chai'
import chaiHttp from 'chai-http'
import request from 'supertest'
import app from '../../server.js'
import {newsletterModel, articlesModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
import fs from 'fs'

chai.use(chaiHttp)

// var article = new articlesModel({
//     Title:"insert 1 from test",
//     FeaturedImage: "download.jpg",
//     Description: "this is from the test"
// })
export function testArticles(app){
    //console.log(article)
    before(function(done){
        this.timeout(20000);
        chai.request(app)
        .post('/api/articles/add')
        .set("Authorization", token)
        .set('Content-Type', 'multipart/form-data')
        .field("title","1article to delete" )
        .attach("article_image", "download.jpg")
        .field("description", "this is the article to delete from the test")
        .end((err, res) => {
            //if(err) done(err)                    
            //chai.expect(res).have.status(200);
            //chai.expect(res.body).be.a('object');
        done();
        });
    })

    describe('Articles', function(){
        this.timeout(20000); 
        it('should insert an article', function(done){
            //console.log("working directory:" +process.cwd());
            chai.request(app)
                .post('/api/articles/add')
                .set("Authorization", token)
                .set('Content-Type', 'multipart/form-data')
                .field("title","2Yeah from tests" )
                .attach("article_image", "download.jpg")
                .field("description", "this is from the test")
                .end((err, res) => {
                    if(err) done(err)                    
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).be.a('object');
                    chai.expect(res.body).to.have.deep.property("_id")
                done();
                });
        })
        
        it('should delete article', function(done){
                articlesModel.findOne({Title: "1article to delete"}).then(function(result){
                    chai.request(app)
                    .post('/api/articles/delete')
                    .set('Content-Type', 'application/json')
                    .set("Authorization", token)
                    .send({"id":result._id})
                    .then((res) => {
                        //console.log(res.body);
                        chai.expect(res).have.status(200);
                        chai.expect(res.body).be.a('object');
                        chai.expect(res.body).to.have.deep.property("_id")
                        done();
                    })   
                    .catch((err) =>{
                        console.log(err)
                        done(err)
                    })                 
                    //assert.strictEqual(result , null, "Still exists")
                })
        })
        it('should view an article')
        it('should view all articles', function(done){
            request(app)
            .get('/api/articles/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200)
                chai.expect(res.body).length(res.body.length).greaterThan(0)
                chai.expect(res.body).to.be.an('array')
                done()
            })
        })
        it('should update an article')
    })
    after(function(){
        articlesModel.findOne({Title: "2Yeah from tests"}).then(function(result){
            chai.request(app)
            .post('/api/articles/delete')
            .set('Content-Type', 'application/json')
            .set("Authorization", token)
            .send({"id":result._id})
            .then((res) => {
                console.log("j");
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("_id")
                //done();
            })   
            .catch((err) =>{
                console.log(err)
                done(err)
            })                 
            //assert.strictEqual(result , null, "Still exists")
        })
    })
}
