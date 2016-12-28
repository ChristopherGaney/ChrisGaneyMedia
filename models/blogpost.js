var mongoose = require('mongoose');

// Blog Schema
var BlogSchema = mongoose.Schema({
	
	blogname: {
		type: String
	},
	blogsubtitle: {
		type: String
	},
	publishdate: {
		type: String
	},
	blogauthor: {
		type: String
	},
	blogsummary: {
		type: String
	}
});

var BlogPost = module.exports = mongoose.model('BlogPost', BlogSchema);

module.exports.createOrUpdate = function(currEvent, callback){
	currEvent.save(currEvent, callback);
}

module.exports.getAllPostsById = function(callback){
	BlogPost.find({}, callback);
}
module.exports.getPostById = function(id, callback){
	BlogPost.findOne({"_id" : id}, callback);
	
}


