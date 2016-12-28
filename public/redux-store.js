var createStore = require('redux').createStore;

var reducer = function(state, action) {
  if(state === undefined) {
    return {};
  }
  var newState = state;
  switch(action.type) {
    case 'load_Page':
      newState = Object.assign({}, state, {data: action.data})
      break;
  }
  return newState;
}

module.exports = {
  configureStore: function(initialState) {
    return createStore(reducer, initialState)
  }
}
