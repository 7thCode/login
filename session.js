const SESSION_MODULE = require('express-session');						// Express Session
const MONGOSTORE_CLASS = require("connect-mongo")(SESSION_MODULE);		// 暗号化されたクッキーとデータベースに保存されたセッションを関連づける
const MONGOOSE_MODULE = require('mongoose');

exports.session = SESSION_MODULE({												// sessionとMongoDBの接続
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
	});
