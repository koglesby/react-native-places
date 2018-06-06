import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/beautiful-place.jpg';
import ImagePicker from 'react-native-image-picker';
class PickImage extends Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
      if(res.didCancel) {
        console.log("user cancelled");
      } else if (res.error) {
        console.log("error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
      }
    });
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title="Select Image" onPress={this.pickImageHandler} />
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