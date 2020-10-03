import {newsletterModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {parserError} from '../config/errorHandler.js'
import jwt from 'jsonwebtoken'

export class Newsletter{
    static getNews(req, res) {
        // try{
            var id = req.body.id
        // }catch(err){
        //     var id
        // }
        
        //console.log(id);
        // try{
            
            if(id){
                // try{
                    
                    newsletterModel.findById(req.body.id,(err, email)=>{
                        if(err) 
                            return res.send({message:"DbErr", Error:err})
                            console.log(err)
                        return res.json(email)
                        //console.log("1 Newsletter returned");
                        
                    })
                // }catch(err){
                //     throw err
            }
        // }catch(err){
        // }else{
            // try{
                newsletterModel.find(function(err, emailInfo) {
                    if (err)
                        return res.send(err)
                    return res.json(emailInfo);
                    //console.log('Newletter returned')
                });
            // }catch(err){
            //     throw err
            // }
            
        // }
        }
        
            
       
    // }
    // Create newsletter
    static createNewsletter(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                return res.send('Status 403')
            }else{
                //console.log(req.body.email);
                try{
                    newsletterModel.create({
                        //Name : 'Mj',
                        Email : req.body.email,
                        //Message : 'Cool',
                        RequestDate: new Date()
                        }, 
                        function(err, emailInfo) {
                            if (err){
                                return res.json(parserError(err));
                            }else{
                                return res.json(emailInfo)
                                
                                //console.log('Newsletter created')
                            }   
                        }
                    );
                }catch(err){
                    throw err
                }
                
            }
        })
    }
    static deleteNewsletter(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403)
            }else{
                //console.log(req.body.email);
                var id = req.body.id
                try{
                    newsletterModel.findOneAndDelete(id, 
                        function(err, emailInfo) {
                            if (err){
                                return res.json(parserError(err));
                            }else{
                               return res.json(emailInfo)
                                //console.log('deleted')
                            }   
                        }
                    );
                }catch(err){
                    throw err
                }
                
            }
        })
    }
}