var express = require('express')
var app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var mustacheExpress = require('mustache-express');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(session({
  secret: 'demo-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));



//connecting mysql for sessions 
var options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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


app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'public/index.html')); 
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

