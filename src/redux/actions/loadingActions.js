export const SET_LOADING_ON = 'SET_LOADING';

export const SetLoading = (value) => {
    return {
        type: SET_LOADING_ON,
        payload: {
            value: value
        }
    }
}