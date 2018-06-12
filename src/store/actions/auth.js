// import { TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import  startMainTabs  from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData));
  };
};

export const authSignup = (authData) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDVaaJqfMSq5JejlsBvGF6VUquDX6nPFp8", {
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
        if (parsedRes.error) {
          alert("Something went wrong. Message: " + parsedRes.error.message);
        } else {
          startMainTabs();
        }
        console.log(parsedRes);
      });
  }
};