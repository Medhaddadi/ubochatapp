// Action Types
import {User} from "../../model/common";

export const SET_USER = 'SET_USER';

// Action Creators
export const setUser = (user:User) => ({
    type: SET_USER,
    payload: user,
});
