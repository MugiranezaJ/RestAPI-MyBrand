var express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')


//const app = express.Router({ mergeParams: true });
var app = express()
//app.use(express.json()); 
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('/public'))

var port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URI || "mongodb+srv://mjackson:jackson123@cluster0.j11nb.mongodb.net/RestAPI?retryWrites=true&w=majority"

mongoose.connect(dbURL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err) => console.error(err))
db.once('open', () => console.log('connected to database'))

var schema = mongoose.Schema
var UserSchema = new mongoose.Schema({
    Name: String,
    Profession: String
});
// admin schema
var adminSChema = new mongoose.Schema({
    //Name: String, 
    Email: String, 
    Password: String, 
    UpdatedTime: { type: Date, default: Date.now }
});
// contacts schema
var contactSChema = new mongoose.Schema({
    Name: String, 
    Email: String, 
    Message: String, 
    ContactDate: String
});
// newsletter schema
var newsletterSChema = new mongoose.Schema({
    //Name: String, 
    Email: String, 
    //Message: String, 
    RequestDate: String
});
// articles schema
var articlesSChema = new mongoose.Schema({
    Title: String, 
    FeaturedImage: String, 
    Description: String, 
    PostDate: String
});
// projects schema
var projectsSChema = new mongoose.Schema({
    Title: String, 
    ProjectImage: String, 
    Description: String, 
    projectDate: String
});
// skills schema
var skillsSChema = new mongoose.Schema({
    Title: String, 
    SkillImage: String, 
    SkillDate: String
});
// profile schema
var profileSChema = new mongoose.Schema({
    Name: String, 
    Caption: String,
    ProfileImage: String, 
    About: String
});

// models
var User = mongoose.model("TestData", UserSchema, "TestData")
var adminModel = mongoose.model("admin", adminSChema, "admin")
var contact = mongoose.model("contacts", contactSChema, "contacts")
var newsletterModel = mongoose.model("newsletter", newsletterSChema, "newsletter")
var articlesModel = mongoose.model("articles", articlesSChema, "articles")
var projectsModel = mongoose.model("projects", projectsSChema, "projects")
var skillsModel = mongoose.model("skills", skillsSChema, "skills")
var profileModel = mongoose.model("profile", profileSChema, "profile")

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //var fieldname = file.fieldname
        //console.log(file.fieldname == 'project_image')
        if(file.fieldname == 'article_image'){
            cb(null, 'public/images/articles')
        }else if(file.fieldname == 'project_image'){
            cb(null, 'public/images/projects')
        }else if(file.fieldname == 'skill_image'){
            cb(null, 'public/images/skills')
        }else if(file.fieldname == 'profile_image'){
            cb(null, 'public/images/profile')
        }else{
            console.log('fieldname not maching');
            
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })

app.post('/api/login', (req, res) =>{
    const user = {
        email: 'jackswalter7@gmail.com',
        password: 'jackson123'
    }
    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({ token })
    })
})
//wellcome route
app.get('/', (req, res) =>{
    res.send('Wellcome to Mjackson\'s restful Api')
})

// list all contacts
app.post('/api/contacts/view', verifyToken, function(req, res) {
    contact.find(function(err, contacts) {
        if (err)
            res.send(err)
        res.json(contacts);
        console.log('Contacts returned')
    });
});

// add a new contact
app.post('/api/contacts/add', function(req, res) {
	contact.create({
		Name : 'Mj',
		Email : 'mj@gmail.com',
        Message : 'Cool',
        ContactDate: new Date()
        }, 
        function(err, Contact) {
            if (err){
                res.send(err);
            }else{
                res.json(Contact)
                console.log('Contact created')
            }   
        }
    );
});

// list newsletter
app.post('/api/newsletter/view', function(req, res) {
    newsletterModel.find(function(err, emailInfo) {
        if (err)
            res.send(err)
        res.json(emailInfo);
        console.log('Newletter returned')
    });
});
// Create newsletter
app.post('/api/newsletter/add', function(req, res) {
	newsletterModel.create({
		//Name : 'Mj',
		Email : 'mj@gmail.com',
        //Message : 'Cool',
        RequestDate: new Date()
        }, 
        function(err, emailInfo) {
            if (err){
                res.send(err);
            }else{
                res.json(emailInfo)
                console.log('Newsletter created')
            }   
        }
    );
});

// view articles
app.post('/api/articles/view', function(req, res) {
    var id = req.query.id
    console.log('id:' + id);
    if (id) {
        articlesModel.findById(id, (err, articleData) =>{
            if(err){
                res.send(err)
            }
            res.json(articleData)
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
// Create article
app.post('/api/articles/add', verifyToken, upload.single('article_image'), function(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) =>{
        if(err){
            console.error(err)
            res.send('status 403')
        }else{
            const file = req.file
            console.log(req.file)
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
                    res.send(err);
                }else{
                    res.json(article)
                    console.log('article created')
                }   
            }
        );
        }
    })
	
});

// view projects
app.post('/api/projects/view', function(req, res) {
    var id = req.query.id
    console.log('id:' + id);
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
            console.log('projects returned')
        });
    }
        

});
// Create project
app.post('/api/projects/add', verifyToken, upload.single('project_image'), function(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            console.log(err);
            res.send('Status 403')
        }else{
            const file = req.file
            console.log(req.file)
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
                    res.send(err);
                }else{
                    res.json(project)
                    console.log('project created')
                }   
            }
        );
        }
    })
    
});

// view skills
app.post('/api/skills/view', function(req, res) {
    var id = req.query.id
    console.log('id:' + id);
    if (id) {
        skillsModel.findById(id, (err, skillsData) =>{
            if(err){
                res.send(err)
            }
            res.json(skillsData)
        })
    }else{
        skillsModel.find(function(err, skills) {
            if (err)
                res.send(err)
            res.json(skills);
            console.log('projects returned')
        });
    }
        

});
// Create project
app.post('/api/skills/add', verifyToken, upload.single('skill_image'), function(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            console.log(err);
            res.send('Status 403')
        }else{
            const file = req.file
            console.log(req.file)
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)
            }
            skillsModel.create({
            Title : req.body.title,
            SkillImage : '/images/skills/' + file.filename,
            //Description : 'A portfolio website where i can meet with my clients',
            SkillDate: new Date()
            }, 
            function(err, skill) {
                if (err){
                    res.send(err);
                }else{
                    res.json(skill)
                    console.log('skill created')
                }   
            }
        );
        }
    })
    
});

// view profile
app.post('/api/profile/view', function(req, res) {
    profileModel.find(function(err, profile) {
        if (err)
            res.send(err)
        res.json(profile);
        console.log('Contacts returned')
    });
});

// reset profile
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
                console.log('profile reset')
            }   
        }
    );
});
// update
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
            console.log(req.file)
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)
            }
            res.setHeader('Content-Type', 'application/json')
            
            profileModel.findByIdAndUpdate(id , data, 
                function(err, profile) {
                    if (err){
                        res.send(err);
                    }else{
                        res.json(profile)
                        console.log('profile updated')
                    }   
                }
            );
        }
    })
    
});

// admin
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
                        if(err) throw err
                        res.json({
                            body: 'name-' + admin,
                            status: 7,
                            message: 'updated successfully',
                            authData
                        })
                    })
                }
                
            })
            
            
            //res.setHeader('Content-Type', 'application/json')
            
        }
    })
})

app.post('/api/test', verifyToken, upload.single('ft_image'), (req, res, next) =>{
    console.log(req.body);
    
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            console.log(err);
            res.send('Status 403')
        }else{
            const file = req.file
            console.log(req.file)
            if (!file) {
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)
            }
            res.setHeader('Content-Type', 'application/json')
            //res.contentType
            res.json({
                body: 'name-' + req.body.name + ' ' + req.body.email,
                File: 'url - /images/' + req.file.filename,
                message: 'Well Done',
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen( port, () =>{
    console.log('Server started at port ' + port)
})

function getData() {
    User.find({}, function (err, user1) {
        if (err) throw err;
        //console.log(user1)
        return user1
    });
}