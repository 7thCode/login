"use strict";

namespace SiteModel {

const mongoose: any = require("mongoose");

const Schema: any = mongoose.Schema;

const Site = new Schema({
//	user_id: {type: Schema.Types.ObjectId},
	name:{type:String},
	url:{type:String},
	path:{type:String}
});

module.exports = mongoose.model("Site", Site);

}
