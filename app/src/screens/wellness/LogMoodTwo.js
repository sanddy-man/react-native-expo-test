import React, { Component } from 'react';
import { Container, Item, Input, Icon, Button, Text, Content, Header, Title, Right, Left, Body} from 'native-base';
import { Lists } from "../../components";
import styles from "./styles";
import { AsyncStorage, View, ImageBackground, Image, TouchableHighlight } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { SecureStore, Font } from 'expo';
import { Constants } from "../../config";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function logMood(index, props){
  SecureStore.getItemAsync("jwt").then((value) => {
    if (value != null){
      if (props.navigation.state.params.editMode) {
        fetch(Constants.API_ROOT + "/moodUpdate", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + value
          },
          body: JSON.stringify({
            mood_log_id: parseInt(props.navigation.state.params.logData.mood_log_id),
            user_id: props.navigation.state.params.logData.user_id,
            timestamp: new Date(props.navigation.state.params.logData.timestamp),
            personal_feeling: props.navigation.state.params.personalFeeling,
            baby_feeling: index,
            reflection_environment: props.navigation.state.params.logData.reflection_environment,
            reflection_focus: props.navigation.state.params.logData.reflection_focus,
            reflection_clarity: props.navigation.state.params.logData.reflection_clarity,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.mood != null){
            props.navigation.state.params.editMoodLog(responseJson.mood);
            props.navigation.navigate("_logMoodResult", {
              logData:responseJson.mood,
              editMoodLog: props.navigation.state.params.editMoodLog,
            });
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        fetch(Constants.API_ROOT + "/moodLog", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + value
          },
          body: JSON.stringify({
            personalFeeling: props.navigation.state.params.personalFeeling,
            babyFeeling: index
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.logData != null){
            props.navigation.state.params.updateMoodLog(responseJson.logData);
            props.navigation.navigate("_logMoodResult", {
              logData:responseJson.logData,
              editMoodLog: props.navigation.state.params.editMoodLog,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }).done();
}

class LogMoodTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  // this.props.navigation.state.params.personalFeeling

  render() {
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Text>{multilingual.BACK[lang]}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{multilingual.LOG_MOOD[lang]}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <View style={styles.questionContainer}>
            <View style={{ marginTop: 20 }}>
              <Text>{multilingual.SELECT_ONE[lang]}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.questionText}>{multilingual.FEELING_QUETION_BABY[lang]}</Text>
            </View>
          </View>
          <Grid style={{marginTop: 40}}>
            <Row style={{height: 120 }}>
              <Col>
                <View style={styles.face}>
                  <TouchableHighlight onPress={() => logMood(1, this.props)}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../../assets/images/face1.png')}
                    />
                  </TouchableHighlight>
                  <Text>{multilingual.AWFUL[lang]}</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.face}>
                  <TouchableHighlight onPress={() => logMood(2, this.props)}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../../assets/images/face2.png')}
                    />
                  </TouchableHighlight>
                  <Text>{multilingual.NOT_VERY_GOOD[lang]}</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.face}>
                  <TouchableHighlight onPress={() => logMood(3, this.props)}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../../assets/images/face3.png')}
                    />
                  </TouchableHighlight>
                  <Text>{multilingual.GOOD[lang]}</Text>
                </View>
              </Col>
            </Row>
            <Row style={{height: 100 }}>
              <Col></Col>
              <Col>
                <View style={styles.face}>
                  <TouchableHighlight onPress={() => logMood(4, this.props)}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../../assets/images/face4.png')}
                    />
                  </TouchableHighlight>
                  <Text>{multilingual.REALLY_GOOD[lang]}</Text>
                </View>
              </Col>
              <Col></Col>
              <Col>
                <View style={styles.face}>
                  <TouchableHighlight onPress={() => logMood(5, this.props)}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../../assets/images/face5.png')}
                    />
                  </TouchableHighlight>
                  <Text>{multilingual.BRILLIANT[lang]}</Text>
                </View>
              </Col>
              <Col></Col>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}

export default LogMoodTwo;