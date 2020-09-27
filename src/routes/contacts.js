import {contactsModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import {parserError} from '../config/errorHandler.js'
// list all contacts
export function getContacts(app){
    
    app.get('/api/contacts/view', function(req, res) {
        contactsModel.find(function(err, contacts) {
            if (err)
                res.send(err)
            res.json(contacts);
            console.log('Contacts returned')
        });
    });
}
// create a new contact
export function createContact(app) {
    //app.use(bodyParser.json())
    app.post('/api/contacts/add',verifyToken, function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.send('Status 403')
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
                            console.log('Contact created')
                        }   
                    }
                );
            }
        })
    });
}