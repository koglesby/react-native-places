import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import {connect} from "react-redux";

const startTabs = (user) => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share-alt", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "rn-places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Places",
          subtitle: user,
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "rn-places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          subtitle: user,
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        }
      ],
      appStyle: {
        tabBarSelectedButtonColor: "orange"
      },
      tabsStyle: {
        tabBarSelectedButtonColor: "orange"
      },
      drawer: {
        left: {
          screen: "rn-places.SideDrawerScreen",
          disableOpenGesture: false // can the drawer be opened with a swipe instead of button (optional, Android only
        }
      }
    });
  });
};

export default startTabs;