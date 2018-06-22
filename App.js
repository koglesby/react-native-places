import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import configureStore from './src/store/configureStore';
import SideDrawerScreen from "./src/screens/SideDrawer/SideDrawer";

const store = configureStore();

//Register Screens

Navigation.registerComponent(
  "rn-places.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "rn-places.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "rn-places.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "rn-places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "rn-places.SideDrawerScreen",
  () => SideDrawerScreen,
  store,
  Provider
);

// Start App

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "rn-places.AuthScreen",
    title: "Authentication"
  }
});


