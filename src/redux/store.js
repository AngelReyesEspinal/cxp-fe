import { createStore, compose } from 'redux';
import rootReducers from './reducers';

const composeEnhancers = window.__redux_devtools_extension_compose__ || compose;
export default createStore(rootReducers, composeEnhancers());