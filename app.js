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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//

var mongoose = require('mongoose');

var passport = require('passport');

var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var LocalStrategy = require('passport-local').Strategy;

var LocalAccount = require("./model/account");

passport.use(new LocalStrategy(LocalAccount.authenticate()));

var MongoStore = require("connect-mongo")(session);

const options = {
  keepAlive: 1,
  connectTimeoutMS: 1000000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var connect_url = "mongodb://localhost/login";

mongoose.connection.once("open", () => {

	mongoose.connection.on("connected", () => {
		console.log("connected");
	});

	mongoose.connection.on("closed", () => {
		console.log("closed");
	});

	mongoose.connection.on("disconnected", () => {
		console.log("disconnected");
	});

	mongoose.connection.on("reconnected", () => {
		console.log("reconnected");
	});

	mongoose.connection.on("error", (error) => {
		console.log("error");
	});

	const sessionMiddleware = session({
		name: "login",
		secret: "hogehoge",
		resave: false,
		rolling: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 365 * 24 * 60 * 60 * 1000,
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 365 * 24 * 60 * 60,
			clear_interval: 60 * 60,
		}),
	});

	app.use(sessionMiddleware);

	// passport
	app.use(passport.initialize());
	app.use(passport.session());
	// passport


	app.post('/login',
		passport.authenticate('local', {
			failureRedirect: '/failure',
			successRedirect: '/success',
		})
	);

	app.get('/regist', function (req, res) {
		LocalAccount.register(new LocalAccount({username: "user"}), "pass").then(() => {
      res.sendFile(__dirname + '/public/assets/success.html');
		}).catch((e) => {
      res.sendFile(__dirname + '/public/assets/failure.html');
		})
	});

	app.get('/login', function (req, res) {
    if (req.user) {
      res.sendFile(__dirname + '/public/assets/already.html');
    } else {
      res.sendFile(__dirname + '/public/assets/login.html');
    }
  });

  app.get('/logout', function (req, res) {
    if (req.user) {
      req.logout();
      res.sendFile(__dirname + '/public/assets/login.html');
    } else {
      res.sendFile(__dirname + '/public/assets/not_loggedin.html');
    }
  });

	app.get('/success', function (req, res) {
		res.sendFile(__dirname + '/public/assets/success.html');
	});

	app.get('/failure', function (req, res) {
		res.sendFile(__dirname + '/public/assets/failure.html');
	});

  app.get('/secret', function (req, res) {
    if (req.user) {
      res.sendFile(__dirname + '/public/assets/secret.html');
    } else {
      res.sendFile(__dirname + '/public/assets/login.html');
    }
  });

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	app.use(function (req, res, next) {
		next(createError(404));
	});

	app.use(function (err, req, res, next) {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		res.status(err.status || 500);
		res.render('error');
	});

});

mongoose.connect(connect_url, options).catch((error) => {});

module.exports = app;
