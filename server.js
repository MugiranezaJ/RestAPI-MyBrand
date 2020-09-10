var express = require('express')
var mongoose = require('mongoose')

var app = express()
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/restApi', { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err) => console.error(err))
db.once('open', () => console.log('connected to database'))

var schema = mongoose.Schema


var UserSchema = new mongoose.Schema({
    Name: String,
    Profession: String
});
var User = mongoose.model("mjackson", UserSchema, "mjackson")

app.get('/', (req, res) =>{
    var result = getData();
    User.findOne({}, function (err, user) {
        if (err) throw err;
        console.log(user)
        if(user){
            res.send('Welcome ' + user.Name+ ", your Profession is " + user.Profession);
        }else{
            res.send('Welcome(Not Found)...')
        }
    });
    //console.log(result);
    
    
})
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