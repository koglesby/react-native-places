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
          image: {
            uri: "https://www.publicdomainpictures.net/pictures/250000/velka/sacramento-iron-bridge.jpg"
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== state.selectedPlace.key
        }),
        selectedPlace: null
      };
    default:
    return state;
  }
};

export default reducer;