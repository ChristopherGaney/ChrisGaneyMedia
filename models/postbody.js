var mongoose = require('mongoose');

// Post Schema
var PostSchema = mongoose.Schema({
	
	postid: {
		type: String
	},
	postbody: {
		type: String
	},
	blogname: {
		type: String
	},
	publishdate: {
		type: String
	}
});

var PostBody = module.exports = mongoose.model('PostBody', PostSchema);

module.exports.createOrUpdate = function(currEvent, callback){
	currEvent.save(currEvent, callback);
}

module.exports.getBodyByPostId = function(id, callback){
	PostBody.findOne({"postid" : id}, callback);
}
