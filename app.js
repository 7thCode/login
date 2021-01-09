// Express

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



/*
	Mongoose

	MongoDBのObjectアダプター
	MongoDBのカプセル化。(抽象レイヤ)

*/

const MONGOOSE_MODULE = require('mongoose');

// MongoDB接続時、一度だけ実行されるハンドラ
// データベースに接続されていることを前提とする処理はこの中に。
MONGOOSE_MODULE.connection.once("open", () => {

	/*
		Session

		Expressのクッキーセッションをデータベースで永続化

	*/
	// --------------------ここから-------------------- //

	// const SESSION_MODULE = require('./session');
	// app.use(SESSION_MODULE.session);≠

	const SESSION_MODULE = require('express-session');						// Express Session
	const MONGOSTORE_CLASS = require("connect-mongo")(SESSION_MODULE);		// 暗号化されたクッキーとデータベースに保存されたセッションを関連づける

	app.use(SESSION_MODULE({												// sessionとMongoDBの接続
		name: "login",	                                           			// セッション名
		secret: "hogehoge",													// セッション暗号化キー
		resave: false,														//
		rolling: true,		                                       			//
		saveUninitialized: true,											//
		cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },						// クッキー側設定
		store: new MONGOSTORE_CLASS({										// MongoDB側接続オブジェクト
			mongooseConnection: MONGOOSE_MODULE.connection,					// Mongoose接続
			ttl: 365 * 24 * 60 * 60,
			clear_interval: 60 * 60,
		}),
	}));

	// --------------------ここまで-------------------- //



	/*
		Passport

		認証モジュール
		アカウントレコード作成、パスワード認証/ハッシュ化などを行う
		requestオブジェクトにlogin(),logout()メソッドが追加される。
		https://knimon-software.github.io/www.passportjs.org/guide/login/
		https://knimon-software.github.io/www.passportjs.org/guide/logout/

		連携承認
		https://knimon-software.github.io/www.passportjs.org/guide/authorize/
	*/
	// --------------------ここから--------------------

	const PASSPORT_MODULE = require('passport');									// Passport 認証用モジュール
	const LOCAL_STRATEGY_PLUGIN = require('passport-local').Strategy;				// パスワード認証用Passportプラグイン
	const LocalAccount = require("./model/account");								// Mongooseアカウント定義

	PASSPORT_MODULE.serializeUser((user, done) => { done(null, user) });
	PASSPORT_MODULE.deserializeUser((user, done) => { done(null, user) });
	PASSPORT_MODULE.use(new LOCAL_STRATEGY_PLUGIN(LocalAccount.authenticate()));	// Mongooseアカウント定義 - パスワード認証

	app.use(PASSPORT_MODULE.initialize());											// Passportの使用前に必須
	app.use(PASSPORT_MODULE.session());												// Passportの使用前に必須

	// --------------------ここまで-------------------- //


	/*
		Application
	*/
	// --------------------ここから-------------------- //

	// ログイン済み？
	app.get('/user', (req, res) => {
		if (req.user) {
			res.json({status:0, value: req.user});
		} else {
			res.json({status:-1, value: null});
		}
	});

	// ログイン
	app.post('/login', (req, res) => {
		PASSPORT_MODULE.authenticate("local", (error, account) => {
			if (!error) {
				if (account) {
					req.login(account, (error) => {
						if (!error) {
							res.json({status:0, value: req.user, message:"OK"});
						} else {
							res.json({status:-1, value: {}, message:error.message});
						}
					});
				} else {
					res.json({status:-2, message:"user found or password missmatch."});
				}
			} else {
				res.json({status:-1, message:error.message});
			}
		})(req, res);
	});

	// ログアウト
	app.get('/logout', (req, res) => {
		if (req.user) {
			req.logout();
			res.json({status:0, value: null, message:"OK"});
		} else {
			res.json({status:-1, value: {}, message: "not logged in."});
		}
	});

	// ユーザ登録
	app.post('/register', (req, res) => {
		LocalAccount.register(new LocalAccount({ username: req.body.username }), req.body.password).then(() => {
			res.json({status:0, value: null, message:"OK"});
		}).catch((e) => {
			res.json({status:-1, message:error.message});
		})
	});

/*
	// 秘匿画面
	app.get('/secret', (req, res) => {
		if (req.user) {
			res.render('index', { title: req.user.username });
		} else {
			res.sendFile(__dirname + '/public/assets/login.html');
		}
	});

	//  登録画面
	app.get('/regist', (req, res) => {
		res.sendFile(__dirname + '/public/assets/regist.html');
	});


*/
	/*
		Upload
	*/
	// --------------------ここから-------------------- //
	const multer = require('multer')
/*
	const upload = multer({
			storage: multer.diskStorage({
				destination: (req, file, cb) => {
					cb(null, __dirname + '/uploads');
				},
				filename: (req, file, cb) => {
					cb(null, file.originalname);
				}
			})
		})
*/
	const upload = multer({ dest: 'uploads/' })

	// アップロード画面
	app.get('/upload', (req, res) => {
		res.sendFile(__dirname + '/public/assets/upload.html');
	});

	// アップロード
	app.post('/upload', upload.single('file'), (req, res) => {
		res.send(req.file.originalname + ' upload success');
	})

	// --------------------ここまで-------------------- //

	// エラー
	app.use((req, res, next) => {
		next(createError(404));
	});

	app.use((err, req, res, next) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		res.render('error');
	});

	// --------------------ここまで--------------------

});

// データベースクローズ時
MONGOOSE_MODULE.connection.on("closed", () => {
	console.log("closed");
});

// データベース切断時
MONGOOSE_MODULE.connection.on("disconnected", () => {
	console.log("disconnected");
});

// データベース再接続時
MONGOOSE_MODULE.connection.on("reconnected", () => {
	console.log("reconnected");
});

// データベース接続エラー時
MONGOOSE_MODULE.connection.on("error", (error) => {
	console.log("error");
});

// Mongo接続オプション
const options = {
	keepAlive: 1,
	connectTimeoutMS: 1000000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connect_url = "mongodb://localhost/login";					// MongoDB接続先

MONGOOSE_MODULE.connect(connect_url, options).catch((error) => {   // Mongoose接続

});

module.exports = app;
