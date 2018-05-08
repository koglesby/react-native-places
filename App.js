import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

//Register Screens

Navigation.registerComponent("sweet-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("sweet-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("sweet-places.FindPlaceScreen", () => FindPlaceScreen);
// Start App

Navigation.startSingleScreenApp({
  screen: {
    screen: "sweet-places.AuthScreen",
    title: "Login"
  }
});