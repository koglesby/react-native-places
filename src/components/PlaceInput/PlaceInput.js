import React, { Component } from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

class PlaceInput extends Component {
  state = {
    placeName: ''
  };

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.onPlaceAdded(this.state.placeName);
  };

  render() {
    return(
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.placeInput}
          placeholder="Awesome place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
        <Button
          onPress={this.placeSubmitHandler}
          title="Add"
          style={styles.placeButton}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "75%"
  },
  placeButton: {
    width: "25%"
  },
});

export default PlaceInput;