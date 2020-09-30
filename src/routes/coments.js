import {contactsModel, articlesModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
// list all contacts
export function getComments(app){
    
    app.get('/api/comments/view', function(req, res) {
        const commentsContainer = []
        var counter = 0
        var commentsProjection = { 
            //_id: false,
            Comments: true
        };
        articlesModel.find( {},commentsProjection ,function(err, comments) {
            if (err)
                res.send(err)
            
            //console.log(comments);
            comments.forEach((doc) =>{
                //console.log(doc.Comments);
                doc.Comments.forEach(docs => {
                    if(docs.Username){
                        commentsContainer.push(docs)
                        counter +=1
                    }
                })
            })
            //console.log(commentsContainer);
            commentsContainer.push({"size":counter})
            res.json(commentsContainer);
            console.log('Comments returned')
        });
    });
}
// create a new contact
export function createComment(app) {
    app.post('/api/comments/add',verifyToken, function(req, res) {
        const id = req.query.id
        if(!id){
            res.json({message:"post id error"})
        }else if(!req.body.comment){
            res.json({mesage:"message null"})
        }else{
            const commentData = [{ 
                        Username: req.body.username,
                        Email: req.body.email,
                        Comment:req.body.comment,
                        CommentDate: new Date()
                    }]
            articlesModel.findByIdAndUpdate(id, {
                //$push: {"Comments":commentData}}, {upsert: true
                $push:{ "Comments": commentData}
                }, 
                function(err, comment) {
                    if (err){
                        res.json(err);
                    }else{
                        res.json(comment)
                        console.log('Comment created')
                    }   
                }
            );   
        }
        
    });
}
export function deleteComment(app) {
    app.post('/api/comments/delete', (req, res) =>{
        const id =  req.query.id
        const comment = req.body.email
        var cdate = req.body.commentDate
        cdate = new Date(cdate)
        console.log(comment);
        console.log(cdate);
        
        if(!id){
            res.json({code:2})
        }else{
            articlesModel.findByIdAndUpdate(id, 
                {$pull:{Comments:{CommentDate: cdate}}},
                (err, result) =>{
                    if(err) console.log("DeleteErr[Comment]:" + err)
                    res.json(result)
                }
            )
        }
    })
}