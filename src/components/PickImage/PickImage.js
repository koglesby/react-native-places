import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/beautiful-place.jpg';

class PickImage extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title="Select Image" onPress={() => alert('pick image')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

export default PickImage;