import { SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    // image posted to the firebase storage
    fetch("https://us-central1-rn-places.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
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
        return fetch("https://rn-places.firebaseio.com/places.json", {
          method: "POST",
          body: JSON.stringify(placeData)
        });
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
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
    fetch("https://rn-places.firebaseio.com/places.json")
      .catch(err => {
        alert("something went wrong :(");
        console.log(err);
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
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
