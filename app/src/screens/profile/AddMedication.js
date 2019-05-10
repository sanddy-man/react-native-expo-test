import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Form, Content } from 'native-base';
import { View, ImageBackground, Image, TouchableHighlight } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UnderlinedInput } from "../../components/inputs";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function addMedication(medication, props){
  props.navigation.state.params.addMedication(medication);
  props.navigation.goBack();
}

function editMedication(medication, props) {
  props.navigation.state.params.editMedication(medication, props.navigation.state.params.index)
  props.navigation.goBack()
}

class AddMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.medication = {
      "prescriptionName": props.navigation.state.params.item ? props.navigation.state.params.item.prescriptionName : '',
      "dosage": props.navigation.state.params.item ? props.navigation.state.params.item.dosage : '',
      "dosageInstructions": props.navigation.state.params.item ? props.navigation.state.params.item.dosageInstructions : '',
    };
    this.updatePrescriptionName = function(text){
      this.medication.prescriptionName = text;
    }

    this.updateDosage = function(text){
      this.medication.dosage = text;
    }

    this.updateDosageInstructions = function(text){
      this.medication.dosageInstructions = text;
    }
  };

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  //props.navigation.state.params.updateMoodLog

  render() {
    const {item} = this.props.navigation.state.params
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
            <Title>{item ? 'Edit Medication' : 'Add Medication'}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Form>
            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.MEDICATION[lang]}</Text>
            </View>
            <UnderlinedInput
              autoFocus
              defaultValue={item && item.prescriptionName}
              label={multilingual.PRESCRIPTION_NAME[lang]}
              onChangeText={(text) => this.updatePrescriptionName(text)}
            />
            <View style={styles.separator} />

            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.DOSAGE[lang]}</Text>
            </View>
            <UnderlinedInput
              defaultValue={item && item.dosage}
              label={multilingual.EX_MG[lang]}
              onChangeText={(text) => this.updateDosage(text)}
            />
            <View style={styles.separator} />

            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.DOSING_INSTRUCTIONS[lang]}</Text>
            </View>
            <UnderlinedInput
              defaultValue={item && item.dosageInstructions}
              label={multilingual.EX_TWICE_A_DAY[lang]}
              onChangeText={(text) => this.updateDosageInstructions(text)}
            />
            <View style={styles.separator} />

            <Button rounded onPress={() => item
              ? editMedication(this.medication, this.props)
              : addMedication(this.medication, this.props)
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

export default AddMedication;