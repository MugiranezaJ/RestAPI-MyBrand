import {skillsModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {upload} from '../config/uploadHandler.js'
import jwt from 'jsonwebtoken'
import { parserError } from '../config/errorHandler.js';

// list skills
export function createSkills(app) {
    app.post('/api/skills/add', verifyToken, upload.single('skill_image'), function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.send('Status 403')
            }else{
                const file = req.file
                //console.log(req.file)
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    return next(error)
                }
                skillsModel.create({
                Title : req.body.title,
                SkillImage : '/images/skills/' + file.filename,
                //Description : 'A portfolio website where i can meet with my clients',
                SkillDate: new Date()
                }, 
                function(err, skill) {
                    if (err){
                        res.json(parserError(err));
                    }else{
                        res.json(skill)
                        console.log('skills created')
                    }   
                }
            );
            }
        })
        
    });
}

export function getSkills(app) {
    app.get('/api/skills/view', function(req, res) {
        var id = req.query.id
        console.log('id:' + id);
        if (id) {
            skillsModel.findById(id, (err, skillsData) =>{
                if(err){
                    res.send(err)
                }
                res.json(skillsData)
            })
        }else{
            skillsModel.find(function(err, skills) {
                if (err)
                    res.send(err)
                res.json(skills);
                console.log('projects returned')
            });
        }
            
    
    });
}