import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    // image posted to the firebase storage
    fetch("https://us-central1-rn-places.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      });
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
