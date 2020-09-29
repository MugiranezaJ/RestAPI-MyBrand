import express from'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import {verifyToken} from './config/security.js'

import models from './models/models.js'

export var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/public'))
//+++++++++++++++++ DELETE++++++++++++++

//console.log("directory: " + __dirname);
//console.log("cwd: " + process.cwd())
//var testFolder = __dirname + '/public/images/articles'
//fs.readdir(testFolder, (err, files) => {
//    files.forEach(file => {
//      console.log(file);
//    });
//  });

import './config/connection.js'
import {port} from './config/connection.js'

import {upload} from './config/uploadHandler.js'

// ########## AUTHANTICATION ##########
import {getToken} from './config/previlage.js'
// get token

getToken(app)

//wellcome route
app.get('/', (req, res) =>{
    res.send('Welcome to Mjackson\'s restful Api (from github)')
})

// ########## CONTACTS ##########
import {createContact, getContacts} from './routes/contacts.js'
// list all contacts
getContacts(app)
// add a new contact
createContact(app)
// ########## NEWSLETTER ##########
import {news, createNewsletter, deleteNewsletter} from './routes/newsletter.js'
// list all newsletter
news(app)
// create newsletter
createNewsletter(app)
//delete newsletter
deleteNewsletter(app)

// ########## ARTICLES ##########
import {updateArticle, createArticle, getArticles, deleteArticle} from './routes/articles.js'
// view articles
getArticles(app)
// Create article
createArticle(app)
// Update article
updateArticle(app)
// delete article
deleteArticle(app)
// ########## ARTICLES ##########
import { getComments, createComment } from './routes/coments.js'
// list all comments
getComments(app)
//create comment
createComment(app)
// ########## PROJECTS ##########
import {createProject, getProject} from './routes/projects.js'
// view projects
getProject(app)
// Create project
createProject(app)

// ########## SKILLS ##########
import {getSkills, createSkills} from './routes/skills.js'
// view skills
getSkills(app)
// Create project
createSkills(app)

// ########## PROFILE ##########
import {getProfile, updateProfile, resetProfile} from './routes/profile.js'
// view profile
getProfile(app)
// reset profile
resetProfile(app)
// update
updateProfile(app)

// ########## ADMIN ##########
import {resetPasword} from './routes/password_reset.js'
// admin
resetPasword(app)
//const port = process.env.PORT || 3000;
var server = app.listen( port, () =>{
    console.log('Server started at port ' + port)
})

export default app