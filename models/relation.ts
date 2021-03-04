"use strict";

namespace RelationModel {

const mongoose: any = require("mongoose");

const Schema: any = mongoose.Schema;

const Relation = new Schema({
	from_user_id: {type: Schema.Types.ObjectId},
	to_user_id: {type: Schema.Types.ObjectId},
	content: {type: mongoose.Schema.Types.Mixed, default: {type:""}},
});

Relation.index({"from_user_id": 1, "to_user_id": 1}, {unique: true});

module.exports = mongoose.model("Relation", Relation);

}
