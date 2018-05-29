import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg'
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { tryAuth } from "../../store/actions";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      }
    })
  };

  updateStyles = (dimensions) => {
    this.setState({
      viewMode: dimensions.window.height > 500 ? "portrait" : "landscape"
    })
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };

  updateInputState = (key, val) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {

      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }

    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: val
      }
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
              ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
              : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: val,
            valid: validate(val, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
      }
    })

  };

  render () {
    let headingText = null;
    let confirmPasswordControl = null;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText style={{color: "white"}}>
          <HeadingText>Authenticate</HeadingText>
        </MainText>
      )
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
        <DefaultInput
          placeholder="Confirm Password"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={(val) => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
        />
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              {headingText}
              <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>
                Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
              </ButtonWithBackground>

                <View style={styles.inputContainer} >
                  <DefaultInput
                    placeholder="Your Email Address"
                    style={styles.input}
                    value={this.state.controls.email.value}
                    onChangeText={(val) => this.updateInputState('email', val)}
                    valid={this.state.controls.email.valid}
                    touched={this.state.controls.email.touched}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                  <View
                    style={
                      this.state.viewMode === "portrait" || this.state.authMode === "login"
                        ? styles.portraitPasswordContainer
                        : styles.landscapePasswordContainer
                    }
                  >
                    <View
                      style={
                        this.state.viewMode === "portrait" || this.state.authMode === "login"
                          ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper
                      }
                    >
                      <DefaultInput
                        placeholder="Password"
                        style={styles.input}
                        value={this.state.controls.password.value}
                        onChangeText={(val) => this.updateInputState('password', val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                        secureTextEntry
                      />
                    </View>
                    {confirmPasswordControl}
                  </View>
                </View>

              <ButtonWithBackground
                color="#29aaf4"
                onPress={this.loginHandler}
                disabled={
                  !this.state.controls.password.valid ||
                  !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
                  !this.state.controls.email.valid}
                secureTextEntry
              >
                Submit
              </ButtonWithBackground>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
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
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  landscapePasswordWrapper: {
    width: "46%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  }
};

export default connect(null, mapDispatchToProps)(AuthScreen);