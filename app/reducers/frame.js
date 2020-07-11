import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'

export const FRAME_GET_LIST = 'Frame.FRAME_GET_LIST';

export const getFrames = (callback) => (dispatch, getState, { fetch }) => {
    return fetch(`/frames`, {
        method: 'GET',
        success: (response) => {
            if (response) {
                const frames = Object.values(response);
                dispatch({ type: FRAME_GET_LIST, frames });
                if (callback) callback(true);
            } else if (callback) callback(false);
        },
        failure: (err) => {
            if (callback) callback(false);
        }
    })
};


const initialState = {
    frames: []
}

export default createReducer(initialState, {
    [FRAME_GET_LIST]: (state, { frames }) => ({
        frames
    }),
})