import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Form, Button, Text, Item, Input, Icon } from "native-base";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import multilingual from "../../config/multilingual";

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: false,
      emailErr: null,
      passErr: null,
    }
  }

  onLogIn() {
    if (this.state.emailErr || this.state.passErr) {
      return
    }
    this.props.onSubmitPress()
  }

  render() {
    const props = this.props;
    return (
      <Form style={styles.form}>
        <UnderlinedInput
          keyboardType="email-address"
          label={multilingual.EMAIL[props.lang]}
          value={props.email}
          onChangeText={text => props.onEmailChange(text)}
          autoFocus={true}
          // onSubmitEditing={() => {
          //   console.log(this.passwordInput)
          //   this.passwordInput.focus()
          // }}
          onSubmitEditing={()=> {
            if (!props.email) {
              this.setState({emailErr: 'Required Field'})
            }
            if (Constants.validateEmail(props.email)) {
              this.setState({ emailErr: null })
            } else {
              this.setState({ emailErr: 'Please enter a valid email address' })
            }
            this.refs.passwordInput._root.focus()
          }}
          blurOnSubmit={false}
          autoCapitalize = 'none'
          error={this.state.emailErr}
        />
        <View style={styles.separator} />

        {/* <UnderlinedInput
          label={Constants.PASSWORD}
          isSecure={true}
          value={props.password}
          onChangeText={text => props.onPasswordChange(text)}
          ref='passwordInput'
        /> */}
        <Item style={styles.item} error={!!this.state.passErr}>
          <Input
            placeholder={multilingual.PASSWORD[props.lang]}
            secureTextEntry={!this.state.showPass}
            value={props.password}
            onChangeText={text => props.onPasswordChange(text)}
            ref='passwordInput'
            style={styles.input}
            autoCapitalize = 'none'
            onSubmitEditing={()=> {
              if (!props.password) {
                this.setState({ passErr: 'Required Field' })
              }
              if (Constants.validatePassword(props.password)) {
                this.setState({ passErr: null })
              } else {
                this.setState({ passErr: 'Password must have 1 capital letter, 1 number and 8 length!' })
              }
            }}
          />
          <Icon
            active
            name={this.state.showPass ? 'eye-off' : 'eye'}
            onPress={() => {
              this.setState({ showPass: !this.state.showPass })
            }}
          />
        </Item>
        {this.state.passErr && <Text style={{ color: '#ea1b36', fontSize: 10, marginTop: 5 }}>{this.state.passErr}</Text>}
        <View style={styles.separator} />

        <Text
          style={styles.registerText}
          onPress={() => props.onCreateAccountPress()}
        >
          {multilingual.SIGN_UP_DESCRIPTION[props.lang]}
        </Text>

        <Button style={styles.getStartedButton} rounded onPress={() => this.onLogIn()}>
          <Text style={styles.getStartedText}>{multilingual.LOG_IN[props.lang]}</Text>
        </Button>
      </Form>
    );
  }
}

const styles = {
  item: {
    marginLeft: 0
  },
  input: {
    fontFamily: "AvenirMedium",
    fontSize: 17,
    color: "#000"
  },
  form: {
    marginTop:10
  },
  separator: {
    marginTop: 20
  },
  getStartedText: {
    fontFamily: "BGBold",
    fontSize: 24,
    color: "#fff"
  },
  getStartedButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor:'#0d9ddb',
    marginTop:20,
    width:200
  },
  registerText: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#000",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: 'underline'
  }
};

export default LoginForm;
