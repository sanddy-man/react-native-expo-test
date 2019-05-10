import React from "react";
import { View, Text, FlatList } from "react-native";
import RentalItem from "./ResourceItem";

function ResourceListItem(props) {
  return (
    <View>
      <Text style={styles.heading}>Jump to a Topic</Text>
      <View style={{ marginTop: 10, flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.list}
          numColumns={3}
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
  },
  list: {
    flex: 1,
    flexDirection: 'column'
  }
};

export default ResourceListItem;
