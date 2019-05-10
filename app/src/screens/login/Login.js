import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";
import { Text } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Constants } from "../../config";
import styles from "./styles";
import { Forms } from "../../components";
import { SecureStore } from 'expo';
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
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

  navigateToRegister() {
    this.resetState();
    this.props.navigation.navigate("_register");
  }

  resetState() {
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    const { lang } = this.state
    return (
      <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
        >
          <View style={styles.content}>
            <View style={styles.centered}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/images/nicu_logo.png")}
                  style={styles.image}
                />
              </View>

              <Text style={styles.introText}>{multilingual.INTRO_TEXT_1[lang]}</Text>
              <Text style={styles.introText}>{multilingual.INTRO_TEXT_2[lang]}</Text>

              <View style={styles.bottom}>
                <Forms.LoginForm
                  email={this.state.email}
                  onEmailChange={text =>
                    this.setState({ email: text })
                  }
                  password={this.state.password}
                  onPasswordChange={text => this.setState({ password: text })}
                  onCreateAccountPress={() => this.navigateToRegister()}
                  onSubmitPress={() => this.login()}
                  lang={lang}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default Login;
