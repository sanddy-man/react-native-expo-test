import React from "react";
import { View } from "react-native";
import { Form, DatePicker } from "native-base";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton } from "../buttons";

function RegisterForm(props) {
  return (
    <Form>
      <UnderlinedInput
        label={Constants.BABY_NAME}
        value={props.name}
        onChangeText={text => props.onNameChange(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        label={Constants.BABY_DOB}
        value={props.dob}
        onChangeText={text => props.onDOBChange(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        keyboardType="email-address"
        label={Constants.EMAIL}
        value={props.email}
        onChangeText={text => props.onEmailChange(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        label={Constants.PASSWORD}
        isSecure={true}
        value={props.password}
        onChangeText={text => props.onPasswordChange(text)}
      />
      <View style={styles.separator} />

      <LgButton
        text={Constants.REGISTER}
        onPress={() => props.onSubmitPress()}
      />
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  }
};

export default RegisterForm;
