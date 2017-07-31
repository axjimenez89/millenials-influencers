var express = require('express')
var app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


app.use(session({secret: 'ssshhhhh'}));
var sess;
app.get('/',function(req,res){
    sess=req.session;
  
    sess.email; // equivalent to $_SESSION['email'] in PHP.
    sess.username; // equivalent to $_SESSION['username'] in PHP.
});




// /// creating a log out
//   var logout = function(req, res, next){
//   req.session.user = null;
//   next()
// };


// //creating a user

// var create_user = function(req, res, next){
//   var email = req.body.email;
//   var password = req.body.password;
