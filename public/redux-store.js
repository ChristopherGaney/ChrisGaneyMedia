var createStore = require('redux').createStore;

var reducer = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'FETCH_ARTICLE':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'LOAD_ARTICLE':
      newState = Object.assign({}, state, { feature: action.data.feature, url: action.data.url })
      break;
    case 'GO_HOME':
      newState = Object.assign({}, state, { feature: action.data.feature, url: action.data.url })
      break;
    case 'FETCH_FAILURE':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
    case 'SET_CLICKED':
      newState = Object.assign({}, state, { message: action.data.message })
      break;
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

module.exports = {
  configureStore: function(initialState) {
    return createStore(reducer, initialState)
  }
}

