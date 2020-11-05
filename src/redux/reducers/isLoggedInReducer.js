import { SET_LOGGED_IN } from '../actions/isLoggedInActions';

let initialState = false;

if (localStorage.getItem('currentUser')) {
    initialState = true;
}

const isLoggedIn = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN:
            return action.payload.value
        default:
            return state;
    }
}

export default isLoggedIn;