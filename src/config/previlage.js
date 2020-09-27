import {verifyToken} from '../config/security.js'
import {adminModel} from '../models/models.js'
import jwt from 'jsonwebtoken'
//import bodyParser from 'body-parser'

export function getToken(app) {
    app.post('/api/login', (req, res) =>{
        var email = req.body.email
        var password = req.body.password
        //console.log(email + " : " + password);
        const User = {
            Email: req.body.email,
            Password: req.body.password
        }
        adminModel.findOne(User, (err, user) => {
            //console.log(user);
            if(user){
                jwt.sign({user}, 'secretKey', (err, token) => {
                    res.json({ token })
                })
            }else{
                res.json(
                    { 
                        statusCode: -1,
                        message: "user does not exist"
                    }
                )
            }
        })
        
    })
}
export var token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNjJlOTFiODRmMmFjNTIwNjFjMGYzNSIsIkVtYWlsIjoiamFja3N3YWx0ZXI3QGdtYWlsLmNvbSIsIlBhc3N3b3JkIjoiamFja3NvbkAiLCJVcGRhdGVkVGltZSI6IjIwMjAtMDktMThUMDk6MzE6MzcuMDgxWiJ9LCJpYXQiOjE2MDA3OTU0NTl9.-KVxTvbr_NEpjB3w4-b-tU881YomQWq8qxGkVTnwH_c"