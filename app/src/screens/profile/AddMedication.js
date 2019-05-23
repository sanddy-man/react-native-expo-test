import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Form, Content, Icon } from 'native-base';
import { View, ImageBackground, Image, TouchableHighlight, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UnderlinedInput } from "../../components/inputs";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function addMedication(medication, props){
  props.navigation.state.params.addMedication(medication);
  props.navigation.goBack();
}

function editMedication(medication, props) {
  props.navigation.state.params.editMedication(medication, props.navigation.state.params.index);
  props.navigation.goBack();
}

function delMedication(medication, props) {
  props.navigation.state.params.delMedication(medication);
  props.navigation.goBack();
}

class AddMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.medication = {
      "medication_id": props.navigation.state.params.item ? props.navigation.state.params.item.medication_id : '',
      "prescription_name": props.navigation.state.params.item ? props.navigation.state.params.item.prescription_name : '',
      "dosage": props.navigation.state.params.item ? props.navigation.state.params.item.dosage : '',
      "dosage_instructions": props.navigation.state.params.item ? props.navigation.state.params.item.dosage_instructions : ''
    };

    this.updatePrescriptionName = function(text){
      this.medication.prescription_name = text;
    }

    this.updateDosage = function(text){
      this.medication.dosage = text;
    }

    this.updateDosageInstructions = function(text){
      this.medication.dosage_instructions = text;
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
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Text onPress={() => this.props.navigation.goBack()} style={styles.headerText}>
              <Icon name='arrow-back' style={styles.headerText}/>
            </Text>
          </Left>
          <Body>
            <Title style={{color:'blue', marginLeft: 20}}>{item ? 'Edit Medication' : 'Add Medication'}</Title>
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
              defaultValue={item && item.prescription_name}
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
              defaultValue={item && item.dosage_instructions}
              label={multilingual.EX_TWICE_A_DAY[lang]}
              onChangeText={(text) => this.updateDosageInstructions(text)}
            />
            <View style={styles.separator} />

            <View style={styles.buttonContainer}>
              {item && <Button style={styles.delButton} onPress={() => delMedication(item, this.props)}>
                <Text>{multilingual.DELETE_TASK[lang]}</Text>
              </Button>}
              <Button style={styles.utdButton} onPress={() => item ? this.medication.prescription_name && this.medication.dosage && this.medication.dosage_instructions
                                            ? editMedication(this.medication, this.props) : Alert.alert("Field should not be empty.")
                                            : this.medication.prescription_name && this.medication.dosage && this.medication.dosage_instructions
                                            ? addMedication(this.medication, this.props) : Alert.alert("Field should not be empty.")
              }>
                <Text>{multilingual.UPDATE_TASK[lang]}</Text>
              </Button>
            </View>
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
  },
  headerText: {
    color: 'blue',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  delButton: {
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ea1b36',
    marginHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  utdButton: {
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0d9ddb',
    marginHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
};

export default AddMedication;
