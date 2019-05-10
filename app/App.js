import React, { Component } from "react";
import { Font, AppLoading } from "expo";

import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      LatoRegular: require("./src/assets/fonts/Lato/Lato-Regular.ttf"),
      LatoBold: require("./src/assets/fonts/Lato/Lato-Bold.ttf"),
      LatoBlack: require("./src/assets/fonts/Lato/Lato-Black.ttf"),
      AvenirMedium: require("./src/assets/fonts/Avenir/Avenir-Medium.ttf"),
      BGMedium: require("./src/assets/fonts/BrandonGrotesque/Brandon_med.otf"),
      BGBold: require("./src/assets/fonts/BrandonGrotesque/Brandon_bld.otf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({
      fontLoaded: true
    });
  }

  render() {
    return this.state.fontLoaded ? <Routes /> : <AppLoading />;
  }
}

export default App;
