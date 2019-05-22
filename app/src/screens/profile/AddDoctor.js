import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Form, Content } from 'native-base';
import { View, ImageBackground, Image, TouchableHighlight, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UnderlinedInput } from "../../components/inputs";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function addDoctor(doctor, props){
  props.navigation.state.params.addDoctor(doctor);
  props.navigation.goBack();
}

function editDoctor(doctor, props) {
  props.navigation.state.params.editDoctor(doctor, props.navigation.state.params.index)
  props.navigation.goBack();
}

class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.doctor = {
      "doctor_id": props.navigation.state.params.item && props.navigation.state.params.item.doctor_id,
      "type": props.navigation.state.params.item && props.navigation.state.params.item.type,
      "name": props.navigation.state.params.item && props.navigation.state.params.item.name,
      "number": props.navigation.state.params.item && props.navigation.state.params.item.number,
    };
    this.updateType = function(text){
      this.doctor.type = text;
    }

    this.updateName = function(text){
      this.doctor.name = text;
    }

    this.updateNumber = function(text){
      this.doctor.number = text;
    }
  };

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  //props.navigation.state.params.updateMoodLog

  render() {
    const { item } = this.props.navigation.state.params
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>{item ? 'Edit Doctor' : 'Add Doctor'}</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Text>{multilingual.CANCEL[lang]}</Text>
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Form>
            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.DOCTOR_TYPE[lang]}</Text>
            </View>
            <UnderlinedInput
              autoFocus
              defaultValue={item && item.type}
              label={multilingual.EX_PRIMARY_CARE_PULMONOLOGIST[lang]}
              onChangeText={(text) => this.updateType(text)}
            />
            <View style={styles.separator} />

            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.DOCTOR_NAME[lang]}</Text>
            </View>
            <UnderlinedInput
              defaultValue={item && item.name}
              label={multilingual.DOCTOR_NAME[lang]}
              onChangeText={(text) => this.updateName(text)}
            />
            <View style={styles.separator} />

            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.PHONE_NUMBER[lang]}</Text>
            </View>
            <UnderlinedInput
              defaultValue={item && item.number}
              label={"000-000-0000"}
              onChangeText={(text) => this.updateNumber(text)}
            />
            <View style={styles.separator} />

            <Button rounded onPress={() => item ? this.doctor.type && this.doctor.name && this.doctor.number
                                          ? editDoctor(this.doctor, this.props) : Alert.alert("Field should not be empty.")
                                          : this.doctor.type && this.doctor.name && this.doctor.number
                                          ? addDoctor(this.doctor, this.props) : Alert.alert("Field should not be empty.")
            }>
              <Text>{multilingual.SAVE[lang]}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = {
  separator: {
    marginTop: 20
  },
  submitButtonContainer: {
    alignSelf: "center",
    marginBottom: 20
  },
  content: {
    padding: 16
  }
};

export default AddDoctor;
