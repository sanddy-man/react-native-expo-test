import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";
import {Image} from "react-native-expo-image-cache";

function loadContent(url){
  Linking.openURL(url);
}

function ResourceItem(props) {
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
      <View style={styles.cardContainer}>
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

const IMAGE_HEIGHT = 75;
// const CONTAINER_WIDTH = 117;
const CONTAINER_WIDTH = Dimensions.get('window').width / 3 - 19.6;

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
    marginTop: 10
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
    fontSize: 12,
    color: "#000"
  }
};

export default ResourceItem;
