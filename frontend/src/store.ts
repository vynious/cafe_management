import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

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
export const store = createStore(rootReducer)

// Export the RootState type
export type { RootState }