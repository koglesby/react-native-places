import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';


//Register Screens

Navigation.registerComponent("sweet-places.AuthScreen", () => AuthScreen);

// Start App

Navigation.startSingleScreenApp({
  screen: {
    screen: "sweet-places.AuthScreen",
    title: "Login"
  }
});