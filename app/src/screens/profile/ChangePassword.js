import React, { Component } from 'react';
import { Container, Header, Content, Form, Text, Icon, Left, Body, Right, Button, Title, View } from 'native-base';
import { Constants } from "../../config";
import { SecureStore } from 'expo';
import { UnderlinedInput } from '../../components/inputs';
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      oldPassErr: null,
      newPassword: '',
      newPassErr: null,
    }
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  changePassword() {
    if (this.state.oldPassErr || this.state.newPassErr) {
      return
    }
    const { profile } = this.props.navigation.state.params

    const data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      email: profile.email,
    }
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/changePassword", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + value
          },
          body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            alert(responseJson.error);
          } else {
            this.props.navigation.goBack()
          }
        }).catch(err => {
          alert(responseJson.error);
          console.log(err)
        })
      }
    }).done();
  }

  checkOldPassword() {
    if (!this.state.oldPassword) {
      this.setState({ oldPassErr: 'Required Field' })
    }
    if (Constants.validatePassword(this.state.oldPassword)) {
      this.setState({ oldPassErr: null })
    } else {
      this.setState({ oldPassErr: 'Password must have 1 capital letter, 1 number and 8 length!' })
    }
  }

  checkNewPassword() {
    if (!this.state.newPassword) {
      this.setState({ newPassErr: 'Required Field' })
    }
    if (Constants.validatePassword(this.state.newPassword)) {
      this.setState({ newPassErr: null })
    } else {
      this.setState({ newPassErr: 'Password must have 1 capital letter, 1 number and 8 length!' })
    }
  }

  render() {
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
              <Text>{multilingual.SETTINGS[lang]}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{multilingual.CHANGE_PASSWORD[lang]}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Form style={{backgroundColor: '#fff', padding: 16}}>
            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>Old Password</Text>
            </View>
            <UnderlinedInput
              autoFocus
              autoCapitalize = 'none'
              defaultValue={this.state.oldPassword}
              label={"Old Password"}
              onChangeText={(text) => this.setState({oldPassword: text})}
              onSubmitEditing={() => {
                this.checkOldPassword()
              }}
              onBlur={() => this.checkOldPassword()}
              error={this.state.oldPassErr}
              isSecure={true}
            />
            <View style={styles.separator} />

            <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
              <Text>New Password</Text>
            </View>
            <UnderlinedInput
              defaultValue={this.state.newPassword}
              label={'New Password'}
              onChangeText={(text) => this.setState({newPassword: text})}
              onSubmitEditing={() => {
                this.checkNewPassword()
              }}
              onBlur={() => this.checkNewPassword()}
              error={this.state.newPassErr}
              isSecure={true}
            />
          </Form>
          <Button rounded onPress={() => this.changePassword()} style={styles.button}>
            <Text>{multilingual.SAVE[lang]}</Text>
          </Button>
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
    backgroundColor: '#fcfbf8',
    width: '100%',
  },
  button: {
    marginTop: 16,
    height: 44,
    width: 120,
    backgroundColor: '#0d9ddb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
};

export default ChangePassword;