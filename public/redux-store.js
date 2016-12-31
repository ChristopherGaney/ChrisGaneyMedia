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
  }
  return newState;
}

module.exports = {
  configureStore: function(initialState) {
    return createStore(reducer, initialState)
  }
}
