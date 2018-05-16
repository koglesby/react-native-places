import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { addPlace} from "../../store/actions";
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import imagePlaceholder from '../../assets/beautiful-place.jpg';

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavEvent);
  }

  onNavEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
          <View style={styles.placeholder}>
            <Image source={imagePlaceholder} style={styles.previewImage}/>
          </View>
          <View style={styles.button}>
            <Button title="Select Image"/>
          </View>
          <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          <View style={styles.button}>
            <Button title="Locate Me" />
          </View>
          <DefaultInput placeholder="Place Name" />
          <View style={styles.button}>
            <Button title="Share Place"/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  previewImage: {
    height: "100%",
    width: "100%"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);