import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import { addPlace } from "../../store/actions";
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
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
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

  imagePickedHandler = image => {
    // receives and image from the image picker in  the PickImage component
    // as an object { uri: res.uri }
    // this.state.controls.image.value is set
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    )
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  };

  render() {
    let submitButton = (
      <Button
        title="Share Place"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid
          || !this.state.controls.location.valid
          || !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator/>;
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
          <PickImage onImagePicked={this.imagePickedHandler}/>
          <PickLocation onLocationPick={this.locationPickedHandler}/>
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.valid}
            touched={this.state.controls.placeName.touched}
          />
          <View style={styles.button}>
            {submitButton}
          </View>
        </KeyboardAvoidingView>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);