var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;

var posts = function(state, action) {
	if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'SET_POSTS':
      newState = Object.assign({}, state, { posts: action.data.posts })
      break;
 }
  return newState;
} 

var feature = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'FETCH_POST':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'LOAD_POST':
      newState = Object.assign({}, state, { feature: action.data.feature, message: action.data.message })
      break;
    case 'FETCH_FAILURE':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
  }
  return newState;
}

var home_feature = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
	 case 'FETCH_POST':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'LOAD_HOME_POST':
      newState = Object.assign({}, state, { feature: action.data.feature, message: action.data.message })
      break;
    case 'FETCH_FAILURE':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
  }
  return newState;
}

var goodArticles = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'SET_CLICKED':
	  newState = Object.assign({}, state, {
		goodArticles: state.goodArticles.map(function(art) {
				if(action.data.id === art._id) {
					return Object.assign({}, art, {
						clicked: true
					})
				}
				return art
			})
		})
	  break;
  }
  return newState;
}

var rootReducer = combineReducers({
	posts,
	feature,
	home_feature,
	goodArticles
});

module.exports = {
  configureStore: function(initialState) {
    return createStore(rootReducer, initialState)
  }
}

