import React from "react";
import { View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "native-base";

function BottomMenuItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Feather
          name={props.icon}
          style={props.active ? styles.icon.active : styles.icon.inactive}
        /> */}
        <Image source={props.source} />
        <Text style={props.active ? styles.text.active : styles.text.inactive}>{props.text}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 2
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    active: {
      fontSize: 20,
      color: "#000"
    },
    inactive: {
      fontSize: 20,
      color: "#A9A9A9"
    }
  },
  text: {
    active: {
      marginTop: 3,
      fontSize: 10,
      color: '#449BD6',
    },
    inactive: {
      marginTop: 3,
      fontSize: 10,
      color: "#A9A9A9",
    }
  }
};

export default BottomMenuItem;
