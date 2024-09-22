import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}
interface RootState {
  form: any; 
}

const reducers = {
  form: formReducer
}

const rootReducer = combineReducers<RootState>(reducers)


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export { store }
export type { RootState }