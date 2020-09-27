import {adminModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import jwt from 'jsonwebtoken'
import { parserError } from '../config/errorHandler.js';

// password reset
export function resetPasword(app) {
    app.post('/api/admin/reset_password', verifyToken, (req, res) =>{
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                console.log(err);
                res.send('Status 403')
            }else{
                id = '5f62e91b84f2ac52061c0f35'
                adminModel.findById(id, (err, adminData) =>{
                    //adminData.toObject()
                    console.log(adminData.Password)
                    var currentPassword = adminData.Password
                    var oldPassword = req.body.oldPassword
                    var newpassword = req.body.newPassword
                    console.log(oldPassword + " " + currentPassword);
                    
                    if(currentPassword != oldPassword) {
                        res.json({status: 4, message:'old password is incollect'})
                    }else{
                        var data = {
                            Password:newpassword,
                            UpdatedTime: new Date()
                        }
                        adminModel.findByIdAndUpdate(id, data, (err, admin) =>{
                            if(err) throw res.json(parserError(err))
                            res.json({
                                body: 'name-' + admin,
                                status: 7,
                                message: 'updated successfully',
                                authData
                            })
                        })
                    }
                    
                })   
            }
        })
    })
}
