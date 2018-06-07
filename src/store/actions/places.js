import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location: location
    };
    fetch("https://us-central1-rn-places.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      });
    // fetch("https://rn-places.firebaseio.com/places.json", {
    //   method: "POST",
    //   body: JSON.stringify(placeData)
    // })
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
