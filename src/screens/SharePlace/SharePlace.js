import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import { addPlace} from "../../store/actions";
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: false
        }
      }
    }
  };

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

  placeNameChangedHandler = val => {
    this.setState(prevState => {
     return {
       controls: {
         ...prevState.controls,
         placeName: {
           ...prevState.controls.placeName,
           value: val,
           valid: validate(val, prevState.controls.placeName.validationRules),
           touched: true
         }
       }
     }
    })
  };

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== "") {
      this.props.onAddPlace(this.state.controls.placeName.value)
    }
  };


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
          <PickImage />
          <PickLocation/>
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.valid}
            touched={this.state.controls.placeName.touched}
          />
          <View style={styles.button}>
            <Button title="Share Place" onPress={this.placeAddedHandler} disabled={!this.state.controls.placeName.valid}/>
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
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);