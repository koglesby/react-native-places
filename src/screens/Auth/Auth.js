import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>Auth Screen</Text>
        <Button title="Switch to Login" onPress={this.loginHandler} />
        <View style={styles.inputContainer} >
          <DefaultInput placeholder="Your Email Address"/>
          <DefaultInput placeholder="Password"/>
          <DefaultInput placeholder="Confirm Password"/>
        </View>

        <Button title="Submit" onPress={this.loginHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  }
});

export default AuthScreen;