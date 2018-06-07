import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from "../actions/actionTypes";

const initialState = {
  places: [],
  selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          location: action.location,
          image: {
            uri: action.image.uri
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        }),
        selectedPlace: null
      };
    default:
      return state;
  }
};

export default reducer;