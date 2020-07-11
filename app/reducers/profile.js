import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { NavigationActions as navigation } from 'react-navigation'

export const getProfile = (email, password) => async (dispatch, getState, { fetch }) => {
    return fetch(`/users?email=${email}&password=${password}`, {
        method: 'GET',
        success: (res) => {
            if (res.id) {
                dispatch(
                    authStoreUserData(res.id + '', { ...res, password })
                );
            } else {

            }
        },
        failure: (err) => {

        }
    })
};

export const updateProfile = (authData) => async (dispatch, getState, { fetch }) => {

    const { user } = getState().auth;


    return fetch(`/users`, {
        method: 'PATCH',
        body: {
            ...authData,
            email: user.email,
            password: user.password
        },
        success: async (res) => {
            if (res) {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Updated successfully.',
                    alertType: 'success',
                });
                await dispatch(getProfile(user.email, user.password))
                await dispatch(navigation.navigate({ routeName: 'Profile' }))
            } else {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Something went wrong. Please try again.',
                    alertType: 'error',
                });
            }
        },
        failure: (err) => {
            MessageBarManager.showAlert({
                title: '',
                message: err.error || err.description,
                alertType: 'error',
            });
        }
    })
};

export const updateAvatar = (data) => async (dispatch, getState, { }) => {
    const { user } = getState().auth;
    let url = `${AppConfig.apiUrl}/avatar`;
    let body = new FormData();
    body.append('avatar', { uri: data.path, name: 'photo.png', filename: 'imageName.png', type: data.mime });
    //body.append('Content-Type', data.mime);
    body.append('email', user.email);
    body.append('password', user.password);
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body
    })
        .catch(err => {
            console.log("err", err);
        })
        .then(res => {
            console.log("res", res);
            if(res.ok){
                dispatch(getProfile(user.email, user.password));
            }
            return res
        });
};

export const updatePassword = (oldpwd, newpwd, callback) => async (dispatch, getState, { fetch }) => {
    const { user } = getState().auth;
    if (oldpwd !== user.password) {
        MessageBarManager.showAlert({
            title: '',
            message: 'Current Password Incorrect',
            alertType: 'error',
        });
        callback();
        return;
    }

    return fetch(`/users`, {
        method: 'PATCH',
        body: {
            newPassword: newpwd,
            email: user.email,
            password: user.password
        },
        success: async (res) => {
            if (res) {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Password Successfully Changed',
                    alertType: 'success',
                });

                await dispatch(authStoreUserData(user.id + '', { ...user, password: newpwd }));
                await dispatch(navigation.navigate({ routeName: 'Profile' }))
            } else {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Something went wrong. Please try again.',
                    alertType: 'error',
                });
            }
        },
        failure: (err) => {
            MessageBarManager.showAlert({
                title: '',
                message: err.error || err.description,
                alertType: 'error',
            });

        }
    })
};

export const sendResetLinkEmail = (email, callback) => async (dispatch, getState, { fetch }) => {


    return fetch(`/reset`, {
        method: 'POST',
        body: {
            email
        },
        success: (res) => {

            if (callback) {
                callback({ success: res })
            }
        },
        failure: (err) => {
            if (callback) {
                callback(err)
            }
        }
    })
}

const initialState = {

}

export default createReducer(initialState, {

})