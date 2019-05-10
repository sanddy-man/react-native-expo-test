import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";
import { Text, Form, Badge, Item, Input, Header, Left, Button, Body, Right } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Constants } from "../../config";
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";

class Register1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dob: "",
      email: "",
      password: "",
      nameError: null,
    };
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  _nextScreen = () => {
    if (this.state.name) {
      this.setState({nameError: null})
    } else {
      this.setState({nameError: 'Field Required!'})
      return
    }
    this.props.navigation.navigate("_register2", {registerData:this.state});
  };

  render() {
    const {lang} = this.state
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => {
          this._nextScreen()
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
                  <Image
                    source={require("../../assets/icons/baby.png")}
                    style={{width:27,height:50,marginTop:20}}
                  />
                  <Text style={styles.introText}>{multilingual.BABY_NAME[lang]}</Text>
                </View>
              </View>
            </View>

            <Form style={styles.form}>
              <View>
                <Item style={styles.item} error={!!this.state.nameError}>
                  <Input
                    enablesReturnKeyAutomatically
                    onSubmitEditing={this._nextScreen}
                    placeholder={multilingual.FIRST_AND_LAST[lang]}
                    style={styles.input}
                    keyboardType={"default"}
                    returnKeyType={"next"}
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                    autoFocus
                  />
                </Item>
                {this.state.nameError && <Text style={{ color: '#ea1b36', fontSize: 10, marginTop: 5 }}>{this.state.nameError}</Text>}
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
                <Badge style={styles.stepDots} primary />
                <Badge style={styles.stepDots} info />
                <Badge style={styles.stepDots} info />
                <Badge style={styles.stepDots} info />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </GestureRecognizer>
    );
  }
}

export default Register1;
