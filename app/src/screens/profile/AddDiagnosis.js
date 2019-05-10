import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Right, Left, Body, Form, Content, Item } from 'native-base';
import { View, ImageBackground, Image, TouchableHighlight } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UnderlinedInput } from "../../components/inputs";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

function addDiagnosis(diagnosis, props){
  props.navigation.state.params.addDiagnosis(diagnosis);
  props.navigation.goBack();
}

function updateDiagnosis(diagnosis, props) {
  props.navigation.state.params.editDiagnosis(diagnosis, props.navigation.state.params.index)
  props.navigation.goBack();
}

class AddDiagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.diagnosis = {
      "name": ""
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
            <Title>{item ? 'Edit Diagnosis' : 'Add Diagnosis'}</Title>
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

            <Button rounded onPress={() => item
              ? updateDiagnosis(this.diagnosis, this.props)
              : addDiagnosis(this.diagnosis, this.props)
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

export default AddDiagnosis;