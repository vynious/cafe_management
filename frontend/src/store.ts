import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}
// Define root state interface
interface RootState {
  form: any; // Replace 'any' with the actual form state type if available
  // Add other state slices here
}

const reducers = {
  // ... your other reducers here ...
  form: formReducer
}

const rootReducer = combineReducers<RootState>(reducers)

// Create the store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Export the store and RootState type
export { store }
export type { RootState }