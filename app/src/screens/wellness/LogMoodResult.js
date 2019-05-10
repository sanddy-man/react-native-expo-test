import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Content, Item, Input} from 'native-base';
import styles from "./styles";
import { View, Image, TouchableOpacity } from "react-native";
import { UnderlinedInput } from "../../components/inputs";
import moment from 'moment';
import { Constants } from '../../config';
import { SecureStore } from 'expo';
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

let faceIcons = {
  1: require('../../assets/images/face1.png'),
  2: require('../../assets/images/face2.png'),
  3: require('../../assets/images/face3.png'),
  4: require('../../assets/images/face4.png'),
  5: require('../../assets/images/face5.png')
}

function updateText(){

}

class LogMoodResult extends Component {
  constructor(props) {
    super(props);
    this.moodLog = {
      'reflection_clarity': props.navigation.state.params.logData.reflection_clarity,
      'reflection_environment': props.navigation.state.params.logData.reflection_environment,
      'reflection_focus': props.navigation.state.params.logData.reflection_focus,
    }
    this.state = {}
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  onSave() {
    const { logData, editMoodLog } = this.props.navigation.state.params
    const data = {
      mood_log_id: parseInt(logData.mood_log_id),
      user_id: logData.user_id,
      timestamp: new Date(logData.timestamp),
      personal_feeling: parseInt(logData.personal_feeling),
      baby_feeling: parseInt(logData.baby_feeling),
      reflection_environment: this.moodLog.reflection_environment,
      reflection_focus: this.moodLog.reflection_focus,
      reflection_clarity: this.moodLog.reflection_clarity,
    }
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/moodUpdate", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + value
          },
          body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.mood != null){
            editMoodLog(responseJson.mood);
            this.props.navigation.navigate("_dashboard")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).done();
  }

  onChangeEnv(env) {
    this.moodLog.reflection_environment = env
  }

  onChangeFocus(focus) {
    this.moodLog.reflection_focus = focus
  }

  onChangeClarity(clarity) {
    this.moodLog.reflection_clarity = clarity
  }

  // this.props.navigation.state.params.logData

  render() {
    // console.log(this.props.navigation.state.params.logData)
    const { logData } = this.props.navigation.state.params
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.navigate("_dashboard")} transparent>
              <Text>{multilingual.BACK[lang]}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{moment(this.props.navigation.state.params.logData.timestamp).format('MMM D')}</Title>
          </Body>
          <Right>
            <Button onPress={() => this.onSave()} transparent>
              <Text>{multilingual.SAVE[lang]}</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.center}>
            <Image
              style={{width: 40, height: 40}}
              source={faceIcons[this.props.navigation.state.params.logData.personal_feeling]}
            />
            <Image
              style={{width: 40, height: 40}}
              source={faceIcons[this.props.navigation.state.params.logData.baby_feeling]}
            />
          </View>
          <View style={styles.resultscontent}>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.questionText}>{multilingual.MY_FEELINGS[lang]}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>{multilingual.FEELING_QUESTION_YOU[lang]}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              if (this.props.navigation.state.params.editMode) {
                this.props.navigation.navigate("_logMoodOne", {
                  logData: this.props.navigation.state.params.logData,
                  editMode: true,
                  editMoodLog: this.props.navigation.state.params.editMoodLog,
                })
              }
            }}>
              <Image
                style={{width: 40, height: 40, marginTop: 20}}
                source={faceIcons[this.props.navigation.state.params.logData.personal_feeling]}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
              <Text>{multilingual.FEELING_QUETION_BABY[lang]}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              if (this.props.navigation.state.params.editMode) {
                this.props.navigation.navigate("_logMoodTwo", {
                  personalFeeling: parseInt(this.props.navigation.state.params.logData.personal_feeling),
                  logData: this.props.navigation.state.params.logData,
                  editMode: true,
                  editMoodLog: this.props.navigation.state.params.editMoodLog,
                })
              }
            }}>
              <Image
                style={{width: 40, height: 40, marginTop: 20}}
                source={faceIcons[this.props.navigation.state.params.logData.baby_feeling]}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 20, fontSize:17 }}>
              <Text style={styles.questionText}>{multilingual.REFLECTION_SPACE[lang]}</Text>
            </View>
            <View style={{ marginTop: 20, fontSize:20 }}>
              <Text style={styles.questionText}>{multilingual.NOTICE_YOUR_ENVIRONMENT[lang]}</Text>
            </View>
            <View style={{ marginTop: 20, fontSize:17 }}>
              <Text style={styles.questionText}>{multilingual.WHAT_HAPPENING_QUESTION[lang]}</Text>
            </View>
            <UnderlinedInput style={{ marginTop: 20 }}
              defaultValue={logData.reflection_environment}
              onChangeText={(env) => this.onChangeEnv(env)}
              label='I am currently...'
              autoFocus
              onSubmitEditing={() => {
                this.refs.reflection_focus._root.focus()
              }}
            />


            <View style={{ marginTop: 20, fontSize:20 }}>
              <Text style={styles.questionText}>{multilingual.FOCUS_ON_THE_POSIITIVE[lang]}</Text>
            </View>
            <View style={{ marginTop: 20, fontSize:17 }}>
              <Text style={styles.questionText}>{multilingual.WHAT_GOOD_THING_HAPPENED_TODAY[lang]}</Text>
            </View>
            <Item style={styles.item}>
              <Input
                defaultValue={logData.reflection_focus}
                onChangeText={(focus) => this.onChangeFocus(focus)}
                placeholder='Two good things that happened today was ...'
                style={styles.input}
                keyboardType={"default"}
                returnKeyType={"next"}
                ref='reflection_focus'
                onSubmitEditing={() => {
                  this.refs.reflection_clarity._root.focus()
                }}
              />
            </Item>

            <View style={{ marginTop: 20, fontSize:20 }}>
              <Text style={styles.questionText}>{multilingual.GAIN_CLARITY[lang]}</Text>
            </View>
            <View style={{ marginTop: 20, fontSize:17 }}>
              <Text style={styles.questionText}>{multilingual.WHY_DID_THESE_GOOD_THINGS_HAPPEN[lang]}</Text>
            </View>
            <Item style={styles.item}>
              <Input
                defaultValue={logData.reflection_clarity}
                onChangeText={(clarity) => this.onChangeClarity(clarity)}
                placeholder='These good things happened because ...'
                style={styles.input}
                keyboardType={"default"}
                returnKeyType={"next"}
                ref='reflection_clarity'
              />
            </Item>
          </View>
        </Content>
      </Container>
    );
  }
}

export default LogMoodResult;