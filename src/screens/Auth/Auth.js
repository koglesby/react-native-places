import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg'

class AuthScreen extends Component {
  state = {
    responsiveStyles: {
      pwContainerDirection: "column",
      pwContainerJustifyContent: "flex-start",
      pwWrapperWidth: "100%"
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", (dimensions) => {
      this.setState({
          responsiveStyles: {
            pwContainerDirection: Dimensions.get('window').height > 500 ? "column" : "row",
            pwContainerJustifyContent: Dimensions.get('window').height > 500 ? "flex-start" : "space-between",
            pwWrapperWidth: Dimensions.get('window').height > 500 ? "100%" : "46%"
          }
      })
    })
  }
  loginHandler = () => {
    startMainTabs();
  };

  render () {
    let headingText = null;
    if (Dimensions.get('window').height > 500) {
      headingText = (
        <MainText style={{color: "white"}}>
          <HeadingText>Authenticate</HeadingText>
        </MainText>
      )
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {headingText}
        <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
          Switch to Login
        </ButtonWithBackground>
        <View style={styles.inputContainer} >
          <DefaultInput placeholder="Your Email Address" style={styles.input}/>
          <View style={{
            flexDirection: this.state.responsiveStyles.pwContainerDirection,
            justifyContent: this.state.responsiveStyles.pwContainerJustifyContent
          }}>
            <View style={{
              width: this.state.responsiveStyles.pwWrapperWidth
            }}>
              <DefaultInput placeholder="Password" style={styles.input}/>
            </View>
            <View style={{
              width: this.state.responsiveStyles.pwWrapperWidth
            }}>
              <DefaultInput placeholder="Confirm Password" style={styles.input}/>
            </View>
          </View>
        </View>
        <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
          Submit
        </ButtonWithBackground>
      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  }
});

export default AuthScreen;