import {SET_USER} from "../Actions/userActions";


const initialState = {
    currentUser: null,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
