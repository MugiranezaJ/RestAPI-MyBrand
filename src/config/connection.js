import mongoose from 'mongoose'
//export function connect(){
export const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URI || "mongodb+srv://mjackson:jackson123@cluster0.j11nb.mongodb.net/RestAPI?retryWrites=true&w=majority"

mongoose.connect(dbURL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err) => console.error(err))
db.once('open', () => console.log('connected to database'))
//}

//export default {port}