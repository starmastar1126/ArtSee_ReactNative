import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { NavigationActions as navigation } from 'react-navigation'

export const GALLERY_GET_LIST = 'Gallery.GALLERY_GET_LIST';

export const getGalleryList = (callback) => (dispatch, getState, { fetch }) => {
    return fetch(`/galleryList`, {
        method: 'GET',
        success: (response) => {
            if (response) {
                const galleryDirectory = Object.values( response );
                dispatch({type: GALLERY_GET_LIST, galleryDirectory });
                if(callback) callback(true);
            } else if(callback) callback(false);
        },
        failure: (err) => {
            if(callback) callback(false);
        }
      })
};


const initialState = {
    galleryDirectory: []
}

export default createReducer(initialState, {
    [GALLERY_GET_LIST]: (state, {galleryDirectory}) => ({
        galleryDirectory
    }),
})