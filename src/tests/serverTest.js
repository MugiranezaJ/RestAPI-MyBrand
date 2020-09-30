import assert from 'assert'
import supertest from 'supertest'
import {app} from '../server.js'
import {newsletterModel, articlesModel} from '../models/models.js'
import { testArticles } from './routes/articles.js';
import { getNewsletter } from './routes/newsletter.js';
import { testContacts } from './routes/contacts.js';

//describe()
//test('adds 1 + 2 to equal 3', () => {
//    expect(1 + 2).toBe(3);
//  });
//app.use('/', index)
var articleModel = articlesModel
var article = new articleModel({
    Title:"1Hey there (test)",
    FeaturedImage: "sampleImage.jpg",
    Description: "yoy yo coooooooool"
})
var articleForDelete = new articleModel({
        Title:"Article for delete",
        FeaturedImage: "sampleImageForDelete.jpg",
        Description: "being deleted"
    })
//console.log(article)
// before(function(done){
//     articleForDelete.save().then(function(){
//         assert(article.isNew === false)
//     }).catch(err =>{
//         console.log("==>" + err)
//     })
//     done()
// })
describe('Server*', function(){
    /*it('should say hello', function(done){
        assert.equal('hello', 'hello')
        done()
    })
    //articles
    //testArticles(app)

    describe('Contacts', ()  => {
        it('shoild insert a contact')
        it('should delete a contact')
        it('should view a contact')
        it('should view all contacts')
    })

    */
    // testArticles(app)
    getNewsletter(app)
    // testContacts(app)
/*
    describe('Projects', ()  => {
        it('shoild insert a project')
        it('should delete a project')
        it('should view a project')
        it('should view all projects')
        it('should update a project')
    })

    describe('Skills', ()  => {
        it('shoild insert a skills')
        it('should delete a skills')
        it('should view a skills')
        it('should view all skills')
        it('should update a skills')
    })
    
    describe('Profile', ()  => {
        //it('shoild insert a skills')
        //it('should delete a skills')
        it('should view a profile')
        //it('should view all skills')
        it('should update a profile')
    })
    //it('should return all contacts')
    //it('should return all newsletters')
    //it('should return profile information')
    describe('Deleting', function(){
        
    })
    describe('Routing', function(){
        
      })*/ 
})
//console.log(app)*/