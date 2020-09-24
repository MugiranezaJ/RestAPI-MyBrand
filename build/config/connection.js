"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.port = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//export function connect(){
var port = process.env.PORT || 3000;
exports.port = port;
var dbURL = process.env.MONGODB_URI || "mongodb+srv://mjackson:jackson123@cluster0.j11nb.mongodb.net/RestAPI?retryWrites=true&w=majority";

_mongoose["default"].connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', function (err) {
  return console.error(err);
});
db.once('open', function () {
  return console.log('connected to database');
}); //}
//export default {port}