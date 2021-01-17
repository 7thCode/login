"use strict";

namespace TweetModel {

const mongoose: any = require("mongoose");

const Schema: any = mongoose.Schema;

const Tweet = new Schema({
	user_id: {type: Schema.Types.ObjectId},
	content: {type: mongoose.Schema.Types.Mixed, default: {username:"",text:""}},
});

module.exports = mongoose.model("Tweet", Tweet);

}
