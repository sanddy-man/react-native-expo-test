import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { Text, Form, Badge, Item, Input, Header, Left, Button, Body, Right, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Constants } from "../../config";
import styles from "./styles";
import { SecureStore } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";

class Register4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.navigation.state.params.registerData,
      showPass: false,
      passwordErr: null,
    }
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  login() {
    fetch(Constants.API_ROOT + "/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code != 200){
        alert(responseJson.message);
        return;
      }

      SecureStore.setItemAsync("jwt", responseJson.token);
      this.resetState();
      this.props.navigation.navigate("_dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  register() {
    return fetch(Constants.API_ROOT + "/register", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        dob: this.state.dob
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error != null){
        alert(responseJson.error);
        return;
      }

      this.login();
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  }

  _nextScreen = () => {
    if (!this.state.password) {
      this.setState({passwordErr: 'Required Field'})
      return
    }
    if (Constants.validatePassword(this.state.password)) {
      this.setState({ passwordErr: null })
      this.register();
    } else {
      this.setState({ passwordErr: 'Password must have 1 capital letter, 1 number and 8 length!' })
    }
  };

  resetState() {
    this.setState({
      name: "",
      dob: "",
      email: "",
      password: ""
    });
  }

  render() {
    const {lang} = this.state
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => {
        }}
        onSwipeRight={(state) => {
          this.props.navigation.goBack()
        }}
        config={Constants.swipeConfig}
        style={{
          flex: 1,
          backgroundColor: 'transparent'
        }}
      >
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
          >
            <Header transparent>
              <Left>
                <Button onPress={() => this.props.navigation.goBack()} transparent>
                  <Text>{multilingual.BACK[lang]}</Text>
                </Button>
              </Left>
              <Body>
              </Body>
              <Right>
              </Right>
            </Header>
            <View style={styles.content}>
              <View style={styles.centered}>
                <View style={styles.imageContainer}>
                  <Text style={styles.introText}>NICU Navigator</Text>
                  <Text style={styles.introText}>{multilingual.SET_A_PASSWORD[lang]}</Text>
                </View>
              </View>
            </View>

            <Form style={styles.form}>
              <View>
                <Item style={styles.item} error={!!this.state.passwordErr}>
                  <Input
                    enablesReturnKeyAutomatically
                    onSubmitEditing={this._nextScreen}
                    placeholder={multilingual.PASSWORD[lang]}
                    style={styles.input}
                    keyboardType={"default"}
                    returnKeyType='done'
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    autoFocus
                    secureTextEntry={!this.state.showPass}
                    autoCapitalize='none'
                  />
                  <Icon
                    active
                    name={this.state.showPass ? 'eye-off' : 'eye'}
                    onPress={() => {
                      this.setState({ showPass: !this.state.showPass })
                    }}
                  />
                </Item>
                {this.state.passwordErr && <Text style={{ color: '#ea1b36', fontSize: 10, marginTop: 5 }}>{this.state.passwordErr}</Text>}
              </View>
            </Form>

            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
              }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  paddingTop: 60,
                }}
              >
                <Badge style={styles.stepDots} info />
                <Badge style={styles.stepDots} info />
                <Badge style={styles.stepDots} info />
                <Badge style={styles.stepDots} primary />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </GestureRecognizer>
    );
  }
}

export default Register4;
