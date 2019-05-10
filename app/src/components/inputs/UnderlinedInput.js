import React, { Component } from "react";
import { View } from "react-native";
import { Item, Input, Label, Text } from "native-base";

class UnderlinedInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props
    return (
      <View>
        <Item style={styles.item} error={!!props.error}>
          <Input
            {...props}
            placeholder={props.label}
            style={styles.input}
            keyboardType={props.keyboardType || "default"}
            maxLength={props.maxLength}
            secureTextEntry={props.isSecure}
            disabled={props.disabled}
            returnKeyType={props.returnKeyType || "next"}
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
          />
        </Item>
        {props.error && <Text style={{ color: '#ea1b36', fontSize: 10, marginTop: 5 }}>{props.error}</Text>}
      </View>
    );
  }
}

const styles = {
  item: {
    marginLeft: 0
  },
  label: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5C6979",
    paddingTop: 4
  },
  input: {
    fontFamily: "AvenirMedium",
    fontSize: 17,
    color: "#000"
  }
};

export default UnderlinedInput;
