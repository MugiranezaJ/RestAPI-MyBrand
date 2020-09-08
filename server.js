var express = require('express')
var app = express()
var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost//restApi')
const db = mongoose.connection
db.on('error',(err) => console.error(err))

db.once('open', () => console.log('connected to database'))
app.listen(300, () =>{
    console.log('Server started')
})