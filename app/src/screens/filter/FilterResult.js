import React, { Component } from "react";
import { View } from "react-native";
import { Container } from "native-base";
import { Constants } from "../../config";
import { Headers, Lists } from "../../components";

class FilterResult extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Headers.BackButtonHeader
          title="Filter Results"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.content}>
          <Lists.FilterResultList
            result={Constants.FILTER_RESULT}
            onItemPress={() => this.props.navigation.navigate("_houseDetail")}
          />
        </View>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1
  }
};

export default FilterResult;
