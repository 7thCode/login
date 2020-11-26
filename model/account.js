"use strict";

const mongoose = require("mongoose");
const passport = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const Account = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String },
});

Account.plugin(passport);　// register(), authenticate()メソッドが追加される。　パスワードがハッシュ化される。

module.exports = mongoose.model("Account", Account);

