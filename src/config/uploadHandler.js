import multer from 'multer'
import 'fs'
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //var fieldname = file.fieldname
        //console.log(file.fieldname == 'project_image')
        if(file.fieldname == 'article_image'){
            cb(null, process.cwd() + '/src/public/images/articles')
        }else if(file.fieldname == 'project_image'){
            cb(null, process.cwd() + '/src/public/images/projects')
        }else if(file.fieldname == 'skill_image'){
            cb(null, process.cwd() + '/src/public/images/skills')
        }else if(file.fieldname == 'profile_image'){
            cb(null, process.cwd() + 'src/public/images/profile')
        }else{
            console.log('fieldname not maching');
            
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
export const upload = multer({ storage: storage })