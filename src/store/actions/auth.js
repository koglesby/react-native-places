import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, AUTH_SET_CURRENT_USER } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import  startMainTabs  from "../../screens/MainTabs/startMainTabs";
import App from '../../../App';

const API_KEY = "AIzaSyDVaaJqfMSq5JejlsBvGF6VUquDX6nPFp8";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
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
        // returns an object with id token, expires in, refresh token
        if (!parsedRes.idToken) {
          alert("Something went wrong :(");
        } else {
          console.log("the parsedRes", parsedRes);
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
            // stores the token, expiryDate (expiresIn converted to Date), and refresh token in AsyncStorage
            // also stores the token and expiryDate in redux state
          );
          dispatch(authStoreUser(parsedRes.email, parsedRes.localId));
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));

    AsyncStorage.setItem("rnp:auth:token", token);
    AsyncStorage.setItem("rnp:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("rnp:auth:refreshToken", refreshToken);
  };
};

export const authStoreUser = (userEmail, userId) => {
  return dispatch => {
    dispatch(authSetCurrentUser(userEmail, userId));

    AsyncStorage.setItem("rnp:auth:userEmail", userEmail);
    AsyncStorage.setItem("rnp:auth:userId", userId);
  };
};

export const authSetCurrentUser = (userEmail, userId) => {
  return {
    type: AUTH_SET_CURRENT_USER,
    userEmail: userEmail,
    userId: userId
  }
};

export const authGetCurrentUser = () => {
  return (dispatch, getState) => {
    const userEmail = getState().auth.userEmail;
    const userId = getState().auth.userId;

    let fetchedUserEmail;

    return new Promise((resolve, reject) => {
      if (userEmail) {
        resolve({userEmail: userEmail, userId: userId});
      } else {
        AsyncStorage.getItem("rnp:auth:userEmail")
          .catch(err => reject())
          .then(userEmailFromStorage => {
              fetchedUserEmail = userEmailFromStorage;
              return AsyncStorage.getItem("rnp:auth:userId")
            }
          ).then(userIdFromStorage => {
          // console.log("new authGetCurrentUser", {userEmail: fetchedUserEmail, userId: userIdFromStorage})
          resolve({userEmail: fetchedUserEmail, userId: userIdFromStorage})
        })
      }
    })

  }
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) < new Date()) {
        // based on the redux state, if there is no token, or it has expired
        // retrieve the token and expiryDate from AsyncStorage
        let fetchedToken;
        AsyncStorage.getItem("rnp:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("rnp:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
            // if the token from AsyncStorage hasn't expired, save the token and expiryDate in redux state
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise.catch(err => {
      // if no token in found in AsyncStorage, or if the the expiryDate from AsyncStorage has passed,
      // retrieve the refreshToken from AsyncStorage
      return AsyncStorage.getItem("rnp:auth:refreshToken")
        .then(refreshToken => {
          return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=refresh_token&refresh_token=" + refreshToken
          });
        })
        // then use that token for a post request,
        // and receive a new token, expires_in, and refresh token
        .then(res => res.json())
        .then(parsedRes => {
          if (parsedRes.id_token) {
            dispatch(
              authStoreToken(
                parsedRes.id_token,
                parsedRes.expires_in,
                parsedRes.refresh_token
              )
            );
            // save the info in AsyncStorage and redux state (minus the refresh token)
            // return the new token
            return parsedRes.id_token;
          } else {
            dispatch(authClearStorage());
            // if the refresh token doesn't work and an id token is not returned, clear AsyncStorage
          }
        });
    })
      .then(token => {
        if (!token) {
          throw(new Error());
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token " + err));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("rnp:auth:token");
    AsyncStorage.removeItem("rnp:auth:expiryDate");

    AsyncStorage.removeItem("rnp:auth:userEmail");
    AsyncStorage.removeItem("rnp:auth:userId");
    return AsyncStorage.removeItem("rnp:auth:refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
    dispatch(authRemoveToken());
  }
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
};