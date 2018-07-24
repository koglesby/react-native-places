import {REMOVE_PLACE, SET_PLACES, PLACE_ADDED, START_ADD_PLACE} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  }
};

export const addPlace = (placeName, location, image, currentUser, description) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found.');
      })
      // image posted to the firebase storage
      .then(token => {
        authToken = token;
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
      .then(res => {
        if (res.ok) {
         return res.json() ;
        } else {
          throw(new Error());
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          userEmail: currentUser.userEmail,
          userId: currentUser.userId,
          description: description,
          timestamp: new Date().getTime(),
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
        return fetch("https://rn-places.firebaseio.com/places.json?auth=" + authToken, {
          method: "POST",
          body: JSON.stringify(placeData)
        })
        .then(res => {
          dispatch(uiStopLoading());
          dispatch(placeAdded());
          dispatch(getPlaces());
        })
        .catch(err => {
          console.log(err);
          alert("Something wen't wrong. Please try again.");
          dispatch(uiStopLoading());
        });
      });
      // the place object is constructed using the imageUrl returned from firebase
      // then posted to firebase database
  };
};

let referenceTimestamp;
export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found.');
      })
      .then(token => {
        if (referenceTimestamp) {
          referenceTimestamp -= 1;
          return fetch("https://rn-places.firebaseio.com/places.json?&orderBy=\"timestamp\"&endAt="
            + referenceTimestamp
            + "&limitToLast=2&auth="
            + token
          );
        } else {
          return fetch("https://rn-places.firebaseio.com/places.json?&orderBy=\"timestamp\"&limitToLast=6&auth="
            + token
          );
        }
      })
      .then(res => res.json())
      .then(parsedRes => {
        let places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        if (places[0]) {
          referenceTimestamp = places[0].timestamp;
          dispatch(setPlaces(places.reverse()));
        }
    })
    .catch(err => {
      alert("something went wrong :(");
      console.log(err);
    });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  }
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
          .then(res => res.json())
          .then(parsedRes => {
            console.log("done");
          })
          .catch(err => {
            alert("something went wrong :(");
            console.log(err);
          });
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
};
