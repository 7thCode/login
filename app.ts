// Express

const express = require('express');
const app = express();

const CONFIG_MODULE: any = require('config');

/*
	Mongoose

	MongoDBのObjectアダプター
	MongoDBのカプセル化。(抽象レイヤ)

*/

let connect_url: string = 'mongodb://localhost/login';

if (CONFIG_MODULE.db) {
	connect_url = 'mongodb://' + CONFIG_MODULE.db.user + ':' + CONFIG_MODULE.db.password + '@localhost/login';
}

const MONGOOSE_MODULE = require('mongoose');
const binanceRouter = require('./routes/binance/api');

// MongoDB接続時、一度だけ実行されるハンドラ
MONGOOSE_MODULE.connection.once('open', () => {

	const path = require('path');
	const createError = require('http-errors');
	const cookieParser = require('cookie-parser');

	// view engine setup
	// app.set('views', path.join(__dirname, 'views'));

	app.set("views", "./views");
	app.set('view engine', 'jade');

	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(cookieParser());
//	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static("./public"));

	const bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({extended: true}));

	/*	Session

		Expressのクッキーセッションをデータベースで永続化
	*/
	/* --------------------ここから--------------------　*/

	const SESSION_MODULE = require('express-session');						// Express Session
	const MONGOSTORE_CLASS = require('connect-mongo');						// 暗号化されたクッキーとデータベースに保存されたセッションを関連づける

	app.use(SESSION_MODULE({												// sessionとMongoDBの接続
		name: 'login',	                                           			// セッション名
		secret: 'hogehoge',													// セッション暗号化キー
		resave: false,														//
		rolling: true,		                                       			//
		saveUninitialized: true,											//
		cookie: {maxAge: 365 * 24 * 60 * 60 * 1000},						// クッキー側設定
		store: MONGOSTORE_CLASS.create({									// MongoDB側接続オブジェクト
			mongoUrl: connect_url,
//			mongooseConnection: MONGOOSE_MODULE.connection,					// Mongoose接続
			ttl: 365 * 24 * 60 * 60,
//			clear_interval: 60 * 60,
		}),
	}));

	/* --------------------ここまで--------------------　*/


	/*	Passport

		認証モジュール
		アカウントレコード作成、パスワード認証/ハッシュ化などを行う
		requestオブジェクトにlogin(),logout()メソッドが追加される。
		https://knimon-software.github.io/www.passportjs.org/guide/login/
		https://knimon-software.github.io/www.passportjs.org/guide/logout/

		連携承認
		https://knimon-software.github.io/www.passportjs.org/guide/authorize/
	*/
	/* --------------------ここから--------------------　*/

	const PASSPORT_MODULE = require('passport');									// Passport 認証用モジュール
	const LOCAL_STRATEGY_PLUGIN = require('passport-local').Strategy;				// パスワード認証用Passportプラグイン
	const LocalAccount = require('./models/account');								// Mongooseアカウント定義

	PASSPORT_MODULE.serializeUser((user: any, done: any) => {
		done(null, user);
	});
	PASSPORT_MODULE.deserializeUser((user: any, done: any) => {
		done(null, user);
	});
	PASSPORT_MODULE.use(new LOCAL_STRATEGY_PLUGIN(LocalAccount.authenticate()));	// Mongooseアカウント定義 - パスワード認証

	app.use(PASSPORT_MODULE.initialize());											// Passportの使用前に必須
	app.use(PASSPORT_MODULE.session());												// Passportの使用前に必須

	/* --------------------ここまで--------------------　*/


	/*	Application	*/
	/* --------------------ここから--------------------　*/

	// ログイン済み？
	app.get('/user', (req: any, res: any) => {
		if (req.user) {
			res.json({status: 0, value: req.user});
		} else {
			res.json({status: -1, value: null});
		}
	});

	// ログイン
	app.post('/login', (req: any, res: any) => {
		if (!req.user) {
			PASSPORT_MODULE.authenticate('local', (error: any, account: any) => {
				if (!error) {
					if (account) {
						req.login(account, (error: any) => {
							if (!error) {
								res.json({status: 0, value: req.user, message: 'OK'});
							} else {
								res.json({status: -1, value: {}, message: error.message});
							}
						});
					} else {
						res.json({status: -2, message: 'user found or password missmatch.'});
					}
				} else {
					res.json({status: -1, message: error.message});
				}
			})(req, res);
		} else {
			res.json({status: -2, message: 'already..'});
		}
	});

	// ログアウト
	app.get('/logout', (req: any, res: any) => {
		if (req.user) {
			req.logout();
			res.json({status: 0, value: null, message: 'OK'});
		} else {
			res.json({status: -1, value: {}, message: 'not logged in.'});
		}
	});

	// ユーザ登録
	app.post('/register', (req: any, res: any) => {
		LocalAccount.register(new LocalAccount({username: req.body.username}), req.body.password).then(() => {
			res.json({status: 0, value: null, message: 'OK'});
		}).catch((error: any) => {
			res.json({status: -1, message: error.message});
		});
	});

	const tweetsRouter = require('./routes/tweets');
	const scraperRouter = require('./routes/scraper/api');
	// const socketRouter = require('./routes/socket/api');
	const binanceRouter = require('./routes/binance/api');
	const passwordRouter = require('./routes/password/api');

	app.use('/tweets', tweetsRouter);
	app.use('/scraper', scraperRouter);
	// app.use('/socket', socketRouter);
	app.use('/binance', binanceRouter);
	app.use('/password', passwordRouter);

	/* --------------------ここまで--------------------　*/

	/*	エラー処理	*/
	/* --------------------ここから--------------------　*/

	app.use((req: any, res: any, next: any) => {
		next(createError(404));
	});

	app.use((err: any, req: any, res: any, next: any) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		res.render('error');
	});

	/* --------------------ここまで--------------------　*/

});


/*	データベース	*/
/* --------------------ここから--------------------　*/

// データベースクローズ時
MONGOOSE_MODULE.connection.on('closed', () => {
	console.log('closed');
});

// データベース切断時
MONGOOSE_MODULE.connection.on('disconnected', () => {
	console.log('disconnected');
});

// データベース再接続時
MONGOOSE_MODULE.connection.on('reconnected', () => {
	console.log('reconnected');
});

// データベース接続エラー時
MONGOOSE_MODULE.connection.on('error', (error: any) => {
	console.log('error');
});

// Mongo接続オプション
const options = {
	keepAlive: 1,
	connectTimeoutMS: 1000000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

MONGOOSE_MODULE.connect(connect_url, options).catch((error: any) => {   // Mongoose接続

});

/* --------------------ここまで--------------------　*/

module.exports = app;

