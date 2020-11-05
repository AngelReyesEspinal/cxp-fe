import { SET_LOADING_ON } from '../actions/loadingActions';

const initialState = false;

const loading = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ON:
            return action.payload.value
        default:
            return state;
    }
}

export default loading;