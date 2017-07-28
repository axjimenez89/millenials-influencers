var express = require('express')
var app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//connecting mysql for sessions 
var options = {
    host: 'localhost',
    port: 3306,
  
};
 
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

var connection = mysql.createConnection(options); // or mysql.createPool(options); 
var sessionStore = new MySQLStore({}/* session store options */, connection);


