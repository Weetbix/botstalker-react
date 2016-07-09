export const SET_ERROR = 'SET_ERROR';
export function setError(header, message) {
    return {
        type: SET_ERROR,
        header,
        message
    };
}

export const CLEAR_ERROR = 'CLEAR_ERROR';
export function clearError() {
    return {
        type: CLEAR_ERROR
    };
}

