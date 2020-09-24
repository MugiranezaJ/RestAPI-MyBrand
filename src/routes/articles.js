import {articlesModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {upload} from '../config/uploadHandler.js'
import {parserError} from '../config/errorHandler.js'
import jwt from 'jsonwebtoken'

export function getArticles(app) {
    // view articles
    app.get('/api/articles/view', function(req, res) {
        var id = req.query.id
        //console.log('id:' + id);
        if (id) {
            articlesModel.findById(id, (err, articleData) =>{
                if(err){
                    res.send(err)
                }
                res.send(articleData)
            })
        }else{
            articlesModel.find(function(err, articles) {
                if (err)
                    res.send(err)
                res.json(articles);
                console.log('Articles returned')
            });
        }
            

    });
}

// create an article
export function createArticle(app) {
    app.post('/api/articles/add', verifyToken, upload.single('article_image'), function(req, res, next) {
        jwt.verify(req.token, 'secretKey', (err, authData) =>{
            if(err){
                console.error(err)
                res.send('status 403')
            }else{
                const file = req.file
                //console.log(req.file)
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    return next(error)
                }
                res.setHeader('Content-Type', 'application/json')
                articlesModel.create({
                    Title : req.body.title/*'NodeJS, Express, MongoDB and Mongoose'*/,
                    FeaturedImage : '/images/articles/' + req.file.filename /*'images/kbs.jpg'*/,
                    Description :req.body.description /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/,
                    PostDate: new Date()
                }, 
                function(err, article) {
                    if (err){
                        res.json(parserError(err));
                    }else{
                        res.json(article)
                        console.log('article created')
                    }   
                }
            );
            }
        })
        
    });
}
//update an article
export function updateArticle(app) {
    app.post('/api/articles/update', verifyToken, upload.single('article_image'), function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) =>{
            if(err){
                console.error(err)
                res.send('status 403')
            }else{
                const file = req.file
                //console.log(req.file)
                var id = req.body.id
                if (!file) {
                    //const error = new Error('Please upload a file')
                    //error.httpStatusCode = 400
                    //return next(error)
                    var data ={
                        Title : req.body.title/*'NodeJS, Express, MongoDB and Mongoose'*/,
                        //FeaturedImage : '/images/articles/' + req.file.filename /*'images/kbs.jpg'*/,
                        Description :req.body.description /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/,
                        PostDate: new Date()
                    }
                    res.setHeader('Content-Type', 'application/json')
                    articlesModel.findByIdAndUpdate(id, data, 
                        function(err, article) {
                            if (err){
                                res.send(err);
                            }else{
                                res.json(article)
                                console.log('article Updated')
                            }   
                        }
                    );
                }else{
                    var data ={
                        Title : req.body.title/*'NodeJS, Express, MongoDB and Mongoose'*/,
                        FeaturedImage : '/images/articles/' + req.file.filename /*'images/kbs.jpg'*/,
                        Description :req.body.description /*'nodejs and express.js tutorial which help to create CRUD operation using Monodb and Mongoose ORM. Mongodb is popular opensource no-SQL database.Mongoose is ORM(Object-relational mapping) that provide helpful methods to do operation with mongodb'*/,
                        PostDate: new Date()
                    }
                    
                    res.setHeader('Content-Type', 'application/json')
                    articlesModel.findByIdAndUpdate(id, data, 
                    function(err, article) {
                        if (err){
                            res.send(err);
                        }else{
                            res.json(article)
                            console.log('article Updated')
                        }   
                    });
                }
                
            
            }
        })
        
    });
}

export function deleteArticle(app) {
    // view articles
    app.post('/api/articles/delete', verifyToken, function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) =>{
            if(err){
                console.error(err)
                res.sendStatus(403)
            }else{
                res.setHeader('Content-Type', 'application/json')
                var id = req.body.id
                //console.log('id:' + id);
                if (id) {
                    articlesModel.findByIdAndDelete( id, (err, articleData) =>{
                        if(err){
                            res.send(err)
                        }
                        res.send(articleData)
                    })
                }else{
                    res.json({message: "Provide id"})
                }
                }
            })    

    });
}