import React, { Component } from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

class PlaceInput extends Component {
  state = {
    placeName: ''
  };

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  };

  render() {
    return(
        <DefaultInput
          style={styles.placeInput}
          placeholder="Awesome place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler} />
    )
  }
}

const styles = StyleSheet.create({
  placeInput: {
    width: "75%"
  }
});

export default PlaceInput;