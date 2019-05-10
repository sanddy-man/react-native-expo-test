import React, { Component } from "react";
import { View, Image, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Button, Text, ActionSheet, Root } from 'native-base';
import { getlang, setlang } from "../../config/constants";
import multilingual from "../../config/multilingual";

const BUTTONS = ["English", "Spanish", "Cancel"];
const CANCEL_INDEX = 2;

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lang: 'es'
    }
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  onChangeLang() {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Select Your Language"
      },
      buttonIndex => {
        if (buttonIndex === CANCEL_INDEX) {
          return
        }
        if (buttonIndex === 0) {
          this.setState({ lang: 'en' })
          setlang('en')
        } else {
          this.setState({ lang: 'es' })
          setlang('es')
        }
      }
    )
  }

  render() {
    return (
      <Root>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <TouchableOpacity style={{position: 'absolute', top: 40, right: 30, zIndex: 100}} onPress={() => this.onChangeLang()}>
            <Text style={styles.loginText}>{this.state.lang.toUpperCase()}</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/nicu_logo.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.bottom}>
              <View style={styles.centered}>
                <Text style={styles.introText}>{multilingual.INTRO_TEXT_1[this.state.lang]}</Text>
                <Text style={styles.introText}>{multilingual.INTRO_TEXT_2[this.state.lang]}</Text>
              </View>
              <View style={styles.centered}>
                <Button style={styles.getStartedButton} rounded onPress={() => this.props.navigation.navigate("_register")}>
                  <Text style={styles.getStartedText}>{multilingual.GET_STARTED[this.state.lang]}</Text>
                </Button>
                <Text style={styles.loginText} onPress={() => this.props.navigation.navigate("_login")}>
                  {multilingual.LOG_IN[this.state.lang]}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Root>
    );
  }
}

export default Home;
