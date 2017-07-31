var express = require('express')
var app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var routes = require('controllers/routes.js');



var sess;

app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
    res.render('index.html');
}
});


var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';

app.post('/login',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  res.end('done');
});

app.get('/admin',function(req,res){
  sess = req.session;
if(sess.email) {
res.send('<h1>Hello '+sess.email+'</h1>');
res.end('<a href="+">Logout</a>');
} else {
    res.send('<h1>Please login first.</h1>');
    res.end('<a href="+">Login</a>');
}
});

app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});




// //creating a user

// var create_user = function(req, res, next){
//   var email = req.body.email;
//   var password = req.body.password;

// app.get('/new', function(req, res){
//     res.render('sessions/new', { 'error': error });

// });
// }

app.listen(3000,function(){
console.log("App Started on PORT 3000");
};
