var express = require('express')
var app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);



var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';




/// creating a log out
  var logout = function(req, res, next){
  req.session.user = null;
  next()
};


//creating a user

var create_user = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

