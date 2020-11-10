var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//

var passport = require('passport');

var session = require('express-session');

app.use(session({
    secret: 'secret',
}));

app.use(passport.initialize());
app.use(passport.session());


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
 if (password === "pass") {
    return done(null, username);
  } else {
    return done(null, false);
  }
}));

app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/failure',
      successRedirect: '/success',
    })
);

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/assets/login.html');
});

app.get('/success', function(req, res){
  res.sendFile(__dirname + '/public/assets/success.html');
});

app.get('/failure', function(req, res){
  res.sendFile(__dirname + '/public/assets/failure.html');
});





passport.serializeUser(function(user, done) {
  console.log("a");
    done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("b");
    done(null, user);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
