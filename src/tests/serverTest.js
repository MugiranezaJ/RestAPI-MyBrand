import assert from 'assert'
import supertest from 'supertest'
import {app} from '../server.js'
import {newsletterModel, articlesModel} from '../models/models.js'
import { testArticles } from './routes/articles.js';
import { getNewsletter } from './routes/newsletter.js';
import { testContacts } from './routes/contacts.js';
import { testSkills } from './routes/skills.js';
import { testProjects } from './routes/project.js';
import { testProfile } from './routes/profile.js';


describe('Server*', function(){
    testArticles(app)
    getNewsletter(app)
    testContacts(app)
    testSkills(app)
    testProjects(app)
    testProfile(app)
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
        
    })*/ 
})