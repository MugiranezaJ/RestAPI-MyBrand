import {newsletterModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {parserError} from '../config/errorHandler.js'
import jwt from 'jsonwebtoken'

// list all newsletter
export function news(app){
    app.get('/api/newsletter/view', function(req, res) {
    newsletterModel.find(function(err, emailInfo) {
        if (err)
            res.send(err)
        res.json(emailInfo);
        console.log('Newletter returned')
    });
});}
// Create newsletter
export function createNewsletter(app){
    app.post('/api/newsletter/add', verifyToken, function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.send('Status 403')
            }else{
                console.log(req.body.email);
                
                newsletterModel.create({
                    //Name : 'Mj',
                    Email : req.body.email,
                    //Message : 'Cool',
                    RequestDate: new Date()
                    }, 
                    function(err, emailInfo) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(emailInfo)
                            console.log('Newsletter created')
                        }   
                    }
                );
            }
        })
    });
}
export function deleteNewsletter(app){
    app.post('/api/newsletter/delete', verifyToken, function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.sendStatus(403)
            }else{
                console.log(req.body.email);
                var id = req.body.id
                newsletterModel.findOneAndDelete(id, 
                    function(err, emailInfo) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(emailInfo)
                            console.log('delete created')
                        }   
                    }
                );
            }
        })
    });
}