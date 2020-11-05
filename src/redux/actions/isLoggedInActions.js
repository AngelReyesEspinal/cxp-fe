export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const SetLoggedIn = (value) => {
    return {
        type: SET_LOGGED_IN,
        payload: {
            value: value
        }
    }
}