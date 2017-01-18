var browserHistory = require('react-router').browserHistory;
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
  
function talkToServer(dats) {
	return function(dispatch) {
		
		if(dats.toPage === '/') {
			dispatch(exports.fetchHomeFeature({ message: 'loading...'}));
		}
		else {
			dispatch(exports.fetchChosenFeature({ message: 'loading...'}));
		}
		
		axios.post(dats.toPage, { id: dats.id })
				  .then(function (response) {
					if(response.data.message === 'yes' && dats.toPage === '/') {
						 dispatch(exports.loadHomeFeature({feature: response.data.feature, message: ''}));
						 browserHistory.push(response.data.url);
						}
					else if(response.data.message === 'yes') {
						 dispatch(exports.loadChosenFeature({feature: response.data.feature, message: ''}));
						 browserHistory.push(response.data.url);
						}
					
					else {
						dispatch(exports.fetchFailure({ message: 'Failure Loading Page'}));
						}
				  }.bind( this ))
				  .catch(function (error) {
					console.log(error);
				  });
	};
}
	
module.exports.getArticle = function(id,name) {
	return function(dispatch) {
		var blogname = name.trim().split(' ').join('-');
		var url = '/articles/' + blogname + '/' + id;
		dispatch(talkToServer({ toPage: url, id: id}));
	};
}	

module.exports.getHomePage = function() {
	return function(dispatch, getState) {
		var id = getState().posts[0]._id;
		dispatch(talkToServer({ toPage: '/', id: id}));
	};
}
	
	
	
