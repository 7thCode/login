"use strict";

namespace elementModel {

const mongoose: any = require("mongoose");

const Schema: any = mongoose.Schema;

const Element = new Schema({
//	user_id: {type: Schema.Types.ObjectId},
	name:{type:String},
	create: {type: Date},
	content: {type: mongoose.Schema.Types.Mixed, default: {text:""}},
});

module.exports = mongoose.model("Element", Element);

}
