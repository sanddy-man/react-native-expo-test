import React, { Component } from "react";
import { View, ImageBackground, Image } from "react-native";
import { Text, Form, Badge, Item, Input, Header, Left, Button, Body, Right } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { Constants } from "../../config";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyID: "",
      formErr: null,
    };
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  _nextScreen = () => {
    if (this.state.studyID) {
      this.setState({ formErr: null })
    } else {
      this.setState({ formErr: 'Field Required' })
      return
    }
    fetch(Constants.API_ROOT + "/validateStudyID", {
      method: "POST",
      body: JSON.stringify({
        study_id: this.state.studyID
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error != null){
        this.setState({ formErr: 'Invalid Study ID' })
        return;
      }

      this.props.navigation.navigate("_register1");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    const {lang} = this.state
    return (
      <GestureRecognizer
        // onSwipe={(direction, state) => {}}
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
                  <Text style={styles.introText}>{multilingual.ENTER_STUDY_ID[lang]}</Text>
                </View>
              </View>
            </View>

            <Form style={styles.form}>
              <View>
                <Item style={styles.item} error={!!this.state.formErr}>
                  <Input
                    enablesReturnKeyAutomatically
                    onSubmitEditing={this._nextScreen}
                    placeholder={multilingual.STUDY_ID[lang]}
                    style={styles.input}
                    keyboardType={"default"}
                    returnKeyType={"next"}
                    value={this.state.studyID}
                    onChangeText={text => this.setState({ studyID: text })}
                    autoFocus={true}
                    autoCapitalize='none'
                  />
                </Item>
                {this.state.formErr && <Text style={{ color: '#ea1b36', fontSize: 10, marginTop: 5 }}>{this.state.formErr}</Text>}
              </View>
            </Form>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </GestureRecognizer>
    );
  }
}

export default Register;
