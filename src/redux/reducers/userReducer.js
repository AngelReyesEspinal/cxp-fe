import { SET_USER } from '../actions/userActions';

let initialState = {};

if (localStorage.getItem('currentUser')) {
    initialState = JSON.parse(localStorage.getItem('currentUser'));
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default user;