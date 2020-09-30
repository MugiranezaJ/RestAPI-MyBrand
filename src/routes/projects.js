import {projectsModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {upload} from '../config/uploadHandler.js'
import jwt from 'jsonwebtoken'
import { parserError } from '../config/errorHandler.js';
// create project
export function createProject(app) {
    app.post('/api/projects/add', verifyToken, upload.single('project_image'), function(req, res) {
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
                res.setHeader('Content-Type', 'application/json')
                projectsModel.create({
                Title : req.body.title,
                ProjectImage : '/images/projects/' + file.filename,
                Description : req.body.description,
                projectsDate: new Date()
                }, 
                function(err, project) {
                    if (err){
                        res.json(parserError(err));
                    }else{
                        res.json(project)
                        //console.log('project created')
                    }   
                }
            );
            }
        })
        
    });
}
// list all projects
export function getProject(app) {
    app.get('/api/projects/view', function(req, res) {
        var id = req.query.id
        //console.log('id:' + id);
        if (id) {
            projectsModel.findById(id, (err, projectData) =>{
                if(err){
                    res.send(err)
                }
                res.json(projectData)
            })
        }else{
            projectsModel.find(function(err, projects) {
                if (err)
                    res.send(err)
                res.json(projects);
                //console.log('projects returned')
            });
        }
            
    
    });
}