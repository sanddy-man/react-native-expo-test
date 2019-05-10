import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body} from 'native-base';
import styles from "./styles";
import { View, ImageBackground, Image, TouchableHighlight } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function logMood(index, props){
  if (props.navigation.state.params.editMode) {
    props.navigation.navigate("_logMoodTwo", {
      personalFeeling: index,
      updateMoodLog: props.navigation.state.params.updateMoodLog,
      editMode: props.navigation.state.params.editMode,
      logData: props.navigation.state.params.logData,
      editMoodLog: props.navigation.state.params.editMoodLog,
    });
  } else {
    props.navigation.navigate("_logMoodTwo", {
      personalFeeling:index,
      updateMoodLog:props.navigation.state.params.updateMoodLog,
      editMoodLog: props.navigation.state.params.editMoodLog,
    });
  }
}

class LogMoodOne extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  render() {
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Text>{multilingual.CANCEL[lang]}</Text>
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
              <Text style={styles.questionText}>{multilingual.FEELING_QUESTION_YOU[lang]}</Text>
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

export default LogMoodOne;