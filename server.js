// require express framework and additional modules
var express =   require('express'),
    app =       express(),
    bodyParser= require('body-parser'),
    mongoose =  require('mongoose'),
    User =      require('./models/user');
//const session = require('express-session');
// app.use(session({
//     secret: 'our secret cat',
//     resave: false,
//     saveUninitialized: true
// }));

// middleware
app.use(express.static('public'));
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/simple-login');

// signup route 
app.get('/signup', function (req, res) {
    res.render('signup');
});

// login route 
app.get('/login', function (req, res) {
    res.render("login");
});


// // A create user route - creates a new user with a secure password
// app.post('/users', function (req, res) {
//     console.log('request body: ', req.body);
//     res.json("it worked!");
// });
// Sign up route - creates a new user with a secure password
app.post('/users', function (req, res) {
    // use the email and password to authenticate here
    db.User.createSecure(req.body.email, req.body.password, function (err, user) {
        res.json(user);
        console.log('request body: ', req.body)
    });
});

app.post('/session', function (req, res) {
    // use the email and password to authenticate here
    db.User.createSecure(req.body.email, req.body.password, function (err, user) {
        res.json(user);
    });
});

// listen on port 3000
app.listen(3000, function () {
    console.log('server started on locahost:3000');
});