import React from 'react';
import {StyleSheet} from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceDescription = props => (
  <DefaultInput
    style={styles.placeDescription}
    placeholder="Add a description"
    multiline={true}
    numberOfLines={2}
    value={props.description}
    onChangeText={props.onChangeText}
    valid={props.valid}
    touched={true}
  />
);

const styles = StyleSheet.create({
  placeDescription: {
    width: "75%"
  }
});

export default PlaceDescription;