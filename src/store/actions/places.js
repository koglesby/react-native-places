import {REMOVE_PLACE, SET_PLACES} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found.');
      })
      .then(token => {
        authToken = token;
        // image posted to the firebase storage
        return fetch("https://us-central1-rn-places.cloudfunctions.net/storeImage", {
          method: "POST",
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            "Authorization" : "Bearer " + authToken
          }
        })
      })
      .catch(err => {
        console.log(err);
        alert("Something wen't wrong. Please try again.");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        // the place object is constructed
        // using the imageUrl returned from firebase
        // And is posted to firebase database
        return fetch("https://rn-places.firebaseio.com/places.json?auth=" + authToken, {
          method: "POST",
          body: JSON.stringify(placeData)
        });
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(getPlaces());
      })
      .catch(err => {
        console.log(err);
        alert("Something wen't wrong. Please try again.");
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found.');
      })
      .then(token => {
        return fetch("https://rn-places.firebaseio.com/places.json?auth=" + token);
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
      dispatch(setPlaces(places));
    })
    .catch(err => {
      alert("something went wrong :(");
      console.log(err);
    });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key) => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found.');
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch("https://rn-places.firebaseio.com/places/" +
          key +
          ".json?auth=" + token, {
          method: "DELETE"
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("done");
      })
      .catch(err => {
        alert("something went wrong :(");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
};
