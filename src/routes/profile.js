import {profileModel} from '../models/models.js'
import {verifyToken} from '../config/security.js'
import {upload} from '../config/uploadHandler.js'
import {parserError} from '../config/errorHandler.js'
import jwt from 'jsonwebtoken'

// view profile
export function getProfile(app) {
    app.get('/api/profile/view', function(req, res) {
        profileModel.find(function(err, profile) {
            if (err)
                res.send(err)
            res.json(profile);
            //console.log('profile returned')
        });
    });
}
// update profile
export function updateProfile(app) {
    app.post('/api/profile/update', verifyToken, upload.single('profile_image'), function(req, res) {
        jwt.verify(req.token, 'secretKey', (err, authData) =>{
            if(err){
                res.sendStatus(403)
            }else{
                const file = req.file
                const id = '5f602ed39e589c5d5cdea5a7'
                var data = {
                    Name : req.body.name,
                    Caption : req.body.caption,
                    ProfileImage: '/images/profile/' + file.filename,
                    About : req.body.about,
                    UpdatedTime: new Date()
                }
                //console.log(req.file)
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    return next(error)
                }
                res.setHeader('Content-Type', 'application/json')
                
                profileModel.findByIdAndUpdate(id , data, 
                    function(err, profile) {
                        if (err){
                            res.json(parserError(err));
                        }else{
                            res.json(profile)
                            //console.log('profile updated')
                        }   
                    }
                );
            }
        })
        
    });
    
}
// reset profile
export function resetProfile(app) {
    app.post('/api/profile/reset', function(req, res) {
        profileModel.create({
            Name : 'Mj',
            Caption : 'mj@gmail.com',
            ProfileImage: 'profile/user.png',
            About : 'Cool',
            UpdatedTime: new Date()
            }, 
            function(err, profile) {
                if (err){
                    res.send(err);
                }else{
                    res.json(profile)
                    //console.log('profile reset')
                }   
            }
        );
    });
}