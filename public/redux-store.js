var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;
var thunkMiddleware = require('redux-thunk').default;
var applyMiddleware = require('redux').applyMiddleware;


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

var chosen_feature = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'FETCH_CHOSEN_FEATURE':
    console.log('in reducer');
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'LOAD_CHOSEN_FEATURE':
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
	 case 'FETCH_HOME_FEATURE':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'LOAD_HOME_FEATURE':
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
    console.log('called');
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
	chosen_feature,
	home_feature,
	goodArticles
});

module.exports = {
  configureStore: function(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))
  }
}

