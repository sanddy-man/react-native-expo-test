import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Form, Content, Item, Icon } from 'native-base';
import { View, ImageBackground, Image, TouchableHighlight, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UnderlinedInput } from "../../components/inputs";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function addDiagnosis(diagnosis, props){
  props.navigation.state.params.addDiagnosis(diagnosis);
  props.navigation.goBack();
}

function updateDiagnosis(diagnosis, props) {
  props.navigation.state.params.editDiagnosis(diagnosis, props.navigation.state.params.index);
  props.navigation.goBack();
}

function delDiagnosis(item, props) {
  props.navigation.state.params.delDiagnosis(item);
  props.navigation.goBack();
}

class AddDiagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.diagnosis = {
      "diagnosis_id": props.navigation.state.params.item ? props.navigation.state.params.item.diagnosis_id : '',
      "name": props.navigation.state.params.item ? props.navigation.state.params.item.name : ''
    };
    this.updateName = function(text){
      this.diagnosis.name = text;
    }
  };

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

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
            <Title style={{color:'blue', marginLeft: 20}}>{item ? 'Edit Diagnosis' : 'Add Diagnosis'}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Form>
            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>{multilingual.DIAGNOSIS[lang]}</Text>
            </View>
            <UnderlinedInput
              autoFocus
              defaultValue={item && item.name}
              label={multilingual.ENTER_CHILD_DIAGNOSIS[lang]}
              onChangeText={(text) => this.updateName(text)}
            />
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
              {item && <Button style={styles.delButton} onPress={() => delDiagnosis(item, this.props)}>
                <Text>{multilingual.DELETE_TASK[lang]}</Text>
              </Button>}
              <Button style={styles.utdButton} onPress={() => item
                ? this.diagnosis.name ? updateDiagnosis(this.diagnosis, this.props) : Alert.alert('Field should not be empty.')
                : this.diagnosis.name ? addDiagnosis(this.diagnosis, this.props) : Alert.alert('Field should not be empty.')
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

export default AddDiagnosis;
