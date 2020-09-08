var express = require('express')
var app = express()
var mongoose =require('mongoose')
var port = process.env.PORT || 3000;

//mongoose.connect('mongodb://localhost//restApi')
//const db = mongoose.connection
//db.on('error',(err) => console.error(err))

//db.once('open', () => console.log('connected to database'))
app.get('/', (req, res) =>{
    res.send('Welcome...');
})
app.listen( port, () =>{
    console.log('Server started')
})