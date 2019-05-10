import React from "react";
import { View, Text, FlatList } from "react-native";
import RentalItem from "./RentalItem";

function RentalsListItem(props) {
  return (
    <View>
      <Text style={styles.heading}>Jump to a Topic</Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={props.categories}
          renderItem={({ item }) => (
            <RentalItem spaced {...item} onPress={text => props.onPress(text)} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ height: 15 }} />
    </View>
  );
}

const styles = {
  heading: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5F5F5F"
  }
};

export default RentalsListItem;
