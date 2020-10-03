import {contactsModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import {parserError} from '../config/errorHandler.js'
// list all contacts
export class Contacts {
    static getContacts(req, res) {
        contactsModel.find(function(err, contacts) {
            if (err)
                res.send(err)
            res.json(contacts);
            //console.log('Contacts returned')
        });
    }
    // create a new contact
    static createContact(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                //console.log(err);
                res.json({message:'404'})
            }else{
                contactsModel.create({
                    Name : req.body.name,
                    Email : req.body.email,
                    Message : req.body.message,
                    ContactDate: new Date()
                    }, 
                    function(err, Contact) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(Contact)
                            //console.log('Contact created')
                        }   
                    }
                );
            }
        })
    }
    static deleteContact(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.sendStatus(403)
            }else{
                //console.log(req.body.email);
                var id = req.body.id
                contactsModel.findOneAndDelete(id, 
                    function(err, emailInfo) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(emailInfo)
                            //console.log('deleted')
                        }   
                    }
                );
            }
        })
    }
}
