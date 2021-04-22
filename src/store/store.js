const {createStore} = require('redux');

function favoritesReducer(state = [], action) {
  switch (action.type) {
    case 'SYNC_FAVORITES_FROM_LOCALSTORAGE':
      const filteredPayload = action.payload.filter(
        item => !state.includes(item),
      );
      return [...filteredPayload, ...state];
    case 'ADD_ITEM_TO_FAVORITES':
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      }
      break;
    case 'REMOVE_ITEM_FROM_FAVORITES':
      return state.filter(item => item !== action.payload);
  }
  return state;
}

const store = createStore(favoritesReducer);

store.subscribe(() => {
  console.log(store.getState());
});

export {store};
