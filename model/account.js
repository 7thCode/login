"use strict";


	const mongoose = require("mongoose");
	const passport = require("passport-local-mongoose");

	const Schema = mongoose.Schema;

	const Account = new Schema({
		username: {type: String, required: true, index: {unique: true}},
		password: {type: String},
	});

	Account.plugin(passport);

	module.exports = mongoose.model("Account", Account);

