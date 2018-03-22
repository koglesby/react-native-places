import React, { Component } from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';

export default class App extends Component {
  state = {
    placeName: ''
  };

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changing something!! Whoa!!</Text>
        <TextInput
          style={{width: 300, borderColor: "black", borderWidth: 1}}
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
