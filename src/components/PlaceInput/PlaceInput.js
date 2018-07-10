import React from 'react';
import {StyleSheet} from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (
  <DefaultInput
    style={styles.placeInput}
    placeholder="Awesome place"
    value={props.placeName}
    onChangeText={props.onChangeText}
    valid={props.valid}
    touched={props.touched}
  />
);

const styles = StyleSheet.create({
  placeInput: {
    width: "75%"
  }
});

export default placeInput;