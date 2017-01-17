
var axios = require('axios');


module.exports.fetchChosenFeature = function(data) {
  return {
	type: 'FETCH_CHOSEN_FEATURE',
	data: data
  };
}
module.exports.fetchHomeFeature = function(data) {
  return {
	type: 'FETCH_HOME_FEATURE',
	data: data
  };
}
module.exports.loadChosenFeature = function(data) {
  return {
	type: 'LOAD_CHOSEN_FEATURE',
	data: data
  };
}
module.exports.loadHomeFeature = function(data) {
  return {
	type: 'LOAD_HOME_FEATURE',
	data: data
  };
}
module.exports.fetchFailure = function(data) {
  return {
	type: 'FETCH_FAILURE',
	data: data
  };
}

module.exports.setArticleClicked = function(data) {
	return {
	type: 'SET_CLICKED',
	data: data
  };
 }
  
