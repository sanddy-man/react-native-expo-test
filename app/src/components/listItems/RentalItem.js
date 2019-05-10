import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Linking
} from "react-native";
import {Image} from "react-native-expo-image-cache";

function RentalItem(props) {
  return (
    <TouchableHighlight
      style={
        props.spaced
          ? { ...styles.container, ...styles.containerSpacing }
          : styles.container
      }
      onPress={() => props.onPress(props.name)}
      underlayColor="#EFF1F5"
    >
      <View>
        <View style={styles.imageContainer}>
          <Image uri={props.image} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const IMAGE_HEIGHT = 150;
const CONTAINER_WIDTH = 200;

const styles = {
  container: {
    width: CONTAINER_WIDTH,
    borderColor: "#F7F7F7",
    backgroundColor:"#FFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 10
  },
  containerSpacing: {
    marginRight: 15,
    marginTop: 5
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  textContainer: {
    padding: 8
  },
  image: {
    height: IMAGE_HEIGHT,
    width: CONTAINER_WIDTH
  },
  title: {
    fontFamily: "LatoBlack",
    fontSize: 18,
    color: "#000"
  }
};

export default RentalItem;
