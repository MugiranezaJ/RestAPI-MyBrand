import express from 'express'
import {Newsletter} from '../routes/newsletter.js'
import { verifyToken } from '../config/security.js';
import { Contacts } from './contacts.js';
import { Profile } from './profile.js';
import { upload } from '../config/uploadHandler.js';
import { Projects } from './projects.js';
import { Skills } from './skills.js';
import { Articles } from './articles.js';
import { Comments } from './coments.js';
import { Admin } from './password_reset.js';


var router = express.Router()
//Profile
router.get('/api/profile/view', Profile.getProfile)
router.post('/api/profile/update', verifyToken, upload.single('profile_image'), Profile.updateProfile)
router.post('/api/profile/reset', verifyToken, Profile.resetProfile)

// Reset password
router.post('/api/admin/reset_password', verifyToken, Admin.resetPasword)

//Articles
router.get('/api/articles/view', Articles.getArticles)
router.post('/api/articles/add', verifyToken, upload.single('article_image'), Articles.createArticle)
router.post('/api/articles/update', verifyToken, upload.single('article_image'), Articles.updateArticle)
router.post('/api/articles/delete', verifyToken, Articles.deleteArticle)

//Comments
router.get('/api/comments/view', Comments.getComments)
router.post('/api/comments/add', Comments.createComment)

//Skills
router.get('/api/skills/view', Skills.getSkills)
router.post('/api/skills/add', verifyToken, upload.single('skill_image'), Projects.createProject)

//Projects
router.get('/api/projects/view', Projects.getProject)
router.post('/api/projects/add', verifyToken, upload.single('project_image'), Projects.createProject)

// Contacts
router.get('/api/contacts/view', Contacts.getContacts)
router.post('/api/contacts/add', verifyToken, Contacts.createContact)
router.post('/api/contacts/delete',verifyToken, Contacts.deleteContact)

//Newsletter
router.get('/api/newsletter/view', Newsletter.getNews)
router.post('/api/newsletter/add', verifyToken, Newsletter.createNewsletter)
router.post('/api/newsletter/delete', verifyToken, Newsletter.deleteNewsletter)



export default router