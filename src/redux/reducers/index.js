import { combineReducers } from 'redux';
import user from './userReducer';
import loading from './loadingReducer';
import isLoggedIn from './isLoggedInReducer';

export default combineReducers({
    user,
    loading,
    isLoggedIn
});