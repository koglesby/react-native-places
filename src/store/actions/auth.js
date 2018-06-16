import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN, TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import  startMainTabs  from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyDVaaJqfMSq5JejlsBvGF6VUquDX6nPFp8";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed. Sorry :(");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        if (!parsedRes.idToken) {
          alert("Something went wrong :(");
        } else {
          dispatch(authStoreToken(parsedRes.idToken));
          startMainTabs();
        }
        console.log(parsedRes);
      });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("rnp:auth:token", token);
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) =>{
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("rnp:auth:token")
          .catch(err=>reject())
          .then(tokenFromStorage => {
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });
      } else {
        resolve(token)
      }
    });
  };
};