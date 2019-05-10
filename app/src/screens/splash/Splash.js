import React, { Component } from "react";
import { View, Image, StatusBar, ImageBackground } from "react-native";
import { SecureStore } from 'expo';
import styles from "./styles";

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      SecureStore.getItemAsync("jwt").then((value) => {
        if (value != null){
          this.props.navigation.navigate("_dashboard");
        } else {
          this.props.navigation.navigate("_home");
        }
      }).done();
    }, 3000);
  }

  render() {
    return (
      <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
        <StatusBar barStyle="dark-content" backgroundColor="#000" />
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/nicu_logo.png")}
              style={styles.image}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
