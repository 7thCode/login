"use strict";

namespace AccountModel {
	
const mongoose: any = require("mongoose");
const passport: any = require("passport-local-mongoose");

const Schema: any = mongoose.Schema;

const Account = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String },
});

Account.plugin(passport);　// register(), authenticate()メソッドが追加される。　パスワードがハッシュ化される。

module.exports = mongoose.model("Account", Account);

}
