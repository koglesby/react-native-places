import {SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE, SET_MORE_PLACES} from "../actions/actionTypes";

const initialState = {
  places: [],
  selectedPlace: null,
  placeAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case SET_MORE_PLACES:
      return {
        ...state,
        places: [...state.places, ...action.morePlaces]
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        }),
        selectedPlace: null
      };
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };
    default:
      return state;
  }
};

export default reducer;