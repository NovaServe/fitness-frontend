import { getFullNameFromLocalStorage, getRoleFromLocalStorage } from "../auth/service/util";

function initialState() {
    return {
        'body': {
            'fullName': getFullNameFromLocalStorage(),
            'role': getRoleFromLocalStorage()
        }
    }
};

function userDataReducer(state = initialState(), action) {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                body: action.payload,
            };
        case 'CLEAR_USER_DATA':
            return {
                ...state,
                body: {},
            };
        default:
            return state;
    }
};

export default userDataReducer;
