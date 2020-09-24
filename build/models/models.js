"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.profileModel = exports.skillsModel = exports.projectsModel = exports.articlesModel = exports.newsletterModel = exports.contactsModel = exports.adminModel = exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model; //var schema = Mode

var UserSchema = new Schema({
  Name: String,
  Profession: String
}); // admin schema

var adminSChema = new Schema({
  //Name: String, 
  Email: {
    type: String,
    required: [true, "Email is required"]
    /*, validate: [isEmail, "Please inter valid email"]*/

  },
  Password: {
    type: String,
    required: [true, "Password is required"]
  },
  UpdatedTime: {
    type: Date,
    "default": Date.now
  }
}); // contacts schema

var contactSChema = new Schema({
  Name: {
    type: String,
    required: [true, "Name is required"]
  },
  Email: {
    type: String,
    required: [true, "Email is required"]
  },
  Message: {
    type: String,
    required: [true, "Message is required"]
  },
  ContactDate: String
}); // newsletter schema

var newsletterSChema = new Schema({
  //Name: String, 
  Email: {
    type: String,
    required: [true, "please enter an email"]
  },
  //Message: String, 
  RequestDate: String
}); // articles schema

var articlesSChema = new Schema({
  Title: {
    type: String,
    required: [true, "Title is required"]
  },
  FeaturedImage: String,
  Description: {
    type: String,
    required: [true, "Description is required"]
  },
  Comments: Array,
  PostDate: String
}); // projects schema

var projectsSChema = new Schema({
  Title: {
    type: String,
    required: [true, "Project title is required"]
  },
  ProjectImage: {
    type: String,
    required: [true, "Project image is required"]
  },
  Description: {
    type: String,
    required: [true, "Project description is required"]
  },
  projectDate: String
}); // skills schema

var skillsSChema = new Schema({
  Title: {
    type: String,
    required: [true, "Skills name is required"]
  },
  SkillImage: {
    type: String,
    required: [true, "Skills image is required"]
  },
  SkillDate: String
}); // profile schema

var profileSChema = new Schema({
  Name: {
    type: String,
    required: [true, "Profile name is required"]
  },
  Caption: {
    type: String,
    required: [true, "Profile caption is required"]
  },
  ProfileImage: {
    type: String,
    required: [true, "Profile image is required"]
  },
  About: {
    type: String,
    required: [true, "Profile about is required"]
  }
}); // models

var User = model("TestData", UserSchema, "TestData");
exports.User = User;
var adminModel = model("admin", adminSChema, "admin");
exports.adminModel = adminModel;
var contactsModel = model("contacts", contactSChema, "contacts");
exports.contactsModel = contactsModel;
var newsletterModel = model("newsletter", newsletterSChema, "newsletter");
exports.newsletterModel = newsletterModel;
var articlesModel = model("articles", articlesSChema, "articles");
exports.articlesModel = articlesModel;
var projectsModel = model("projects", projectsSChema, "projects");
exports.projectsModel = projectsModel;
var skillsModel = model("skills", skillsSChema, "skills");
exports.skillsModel = skillsModel;
var profileModel = model("profile", profileSChema, "profile");
exports.profileModel = profileModel;
var _default = {
  adminModel: adminModel,
  contactsModel: contactsModel,
  newsletterModel: newsletterModel,
  articlesModel: articlesModel,
  projectsModel: projectsModel,
  skillsModel: skillsModel,
  profileModel: profileModel
}; //export default contact
//export default newsletterModel
//module.exports. newsletterModel = newsletterModel
//export default articlesModel
//export default projectsModel
//export default skillsModel
//export default profileModel
//module.exports = newsletterModel

exports["default"] = _default;