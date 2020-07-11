import createReducer, { RESET_STORE } from '../createReducer'
//import { getUser, setToken, setRefreshToken } from './user'
//import { getErrorMessage } from '../utils/utils'
import { AsyncStorage } from 'react-native'
import AppConfig from '../config/AppConfig'
import { NavigationActions as navigation } from 'react-navigation'
import FBSDK, {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from "react-native-fbsdk";
import { getProfile } from './profile'

var MessageBarManager = require('react-native-message-bar').MessageBarManager;

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'Auth.LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'Auth.LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'Auth.LOGIN_FAILURE'

export const AUTH_SET_USER_DATA = 'Auth.AUTH_SET_USER_DATA';

export const CLEAR = 'Auth.CLEAR'


export const login = (email, password) => async (dispatch, getState, { fetch }) => {
  dispatch({ type: LOGIN_REQUEST })
  return fetch(`/users?email=${email}&password=${password}`, {
    method: 'GET',
    success: (res) => {
      if(res.id)
      {
        dispatch(
          authStoreUserData(res.id+'', {...res, password})
        );
        dispatch(navigation.navigate({routeName: 'App'}))
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
        message: err.description || err.error,
        alertType: 'error',
      });
    }
  })
}
export const signup = (authData) => async (dispatch, getState, {fetch}) => {
  dispatch({ type: LOGIN_REQUEST })
  return fetch(`/users`, {
    method: 'POST',
    body: authData,
    success: (res) => {
      if(res.id)
      {
        dispatch(
          authStoreUserData(res.id+'', {...res, password: authData.password})
        );
        dispatch(navigation.navigate({routeName: 'App'}))
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
}
export const authFB = (authData) => async (dispatch, getState, { }) => {
  dispatch({ type: LOGIN_REQUEST })
  let url = `${AppConfig.apiUrl}/user/fb_login?email=${
    authData.email
    }&name=${authData.name}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: 0 })
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch({ type: LOGIN_SUCCESS })
      if (parsedRes.error) {
        alert(parsedRes.error);
      } else {
        dispatch(
          authStoreUserData(parsedRes.data.token, parsedRes.data.user)
        );
        dispatch(navigation.navigate({ routeName: 'App' }))
      }
    });
}
export const authSetUserData = (token, user) => {
  return {
    type: AUTH_SET_USER_DATA,
    token,
    user
  };
};

export const authStoreUserData = (token, user) => {
  return dispatch => {
    dispatch(authSetUserData(token, user));
    AsyncStorage.multiSet([
      ["cp:auth:token", token ? token : ''],
      ["cp:auth:email", user.email ? user.email :''],
      ["cp:auth:firstName", user.firstName ? user.firstName: ''],
      ["cp:auth:lastName", user.firstName ? user.firstName : ''],
      ["cp:auth:phone", user.phone ? user.phone : ''],
      ["cp:auth:id", user.id.toString()],
      ["cp:auth:password", user.password ? user.password : ''],
      ["cp:auth:avatar", user.avatar ? user.avatar : ''],
    ]);
  };
};
export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        if (token) {
          //dispatch(getProfile());
          dispatch(navigation.navigate({ routeName: 'App' }))
        } else {
          dispatch(navigation.navigate({ routeName: 'Auth' }))
        }
      })
      .catch(err => dispatch(navigation.navigate({ routeName: 'Auth' })));
  };
};
export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.multiGet([
          "cp:auth:token",
          "cp:auth:email",
          "cp:auth:firstName",
          "cp:auth:lastName",
          "cp:auth:phone",
          "cp:auth:id",
          "cp:auth:password",
          "cp:auth:avatar",
        ])
          .catch(err => reject())
          .then(keys => {
            if (!keys[0] || !keys[0][1]) {
              reject();
              return;
            }
            dispatch(
              authSetUserData(keys[0][1], {
                email: keys[1][1],
                firstName: keys[2][1],
                lastName: keys[3][1],
                phone: keys[4][1],
                id: keys[5][1],
                password: keys[6][1],
                avatar: keys[7][1],
              })
            );
            resolve(keys[0][1]);
          });
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};
export function authSignOut() {
  return async function (dispatch, getState) {
    dispatch(navigation.navigate({ routeName: 'Login' }))
    dispatch(authSetUserData(null, null));
    AsyncStorage.clear();
  }
}
export const facebookAuth = () => {
  LoginManager.logOut();
  return dispatch => {
    LoginManager.logInWithReadPermissions(["email", "public_profile"]).then(
      function (result) {

        if (result.isCancelled) {

        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;

            const responseInfoCallback = (error, result) => {
              if (error) {
                //console.log("Error fetching data: " + error.toString());
              } else {
                const data = {
                  email: result.email && result.email !== undefined ? result.email : result.id,
                  name: result.name
                };
                dispatch(authFB(data));
              }
            };

            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: "id,email,name"
                  }
                }
              },
              responseInfoCallback
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        //console.log("Login fail with error: " + error);
      }
    );
  };
};
export const clear = () => ({ type: CLEAR })

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  loginfailed: 0,
  token: null,
  user: null
}

export default createReducer(initialState, {
  [LOGIN_REQUEST]: (state, action) => ({
    loading: true,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    loading: false,
    loginfailed: 0
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    loading: false,
    loginfailed: action.payload
  }),
  [AUTH_SET_USER_DATA]: (state, action) => ({
    token: action.token,
    user: action.user
  }),
  [CLEAR]: (state, action) => RESET_STORE,
})
