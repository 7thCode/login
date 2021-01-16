"use strict";

namespace TweetModel {

const mongoose: any = require("mongoose");

const Schema: any = mongoose.Schema;

const Tweet = new Schema({
	user_id: {type: Schema.Types.ObjectId},
	content: {type: String, default: ""}
});

module.exports = mongoose.model("Tweet", Tweet);

}
