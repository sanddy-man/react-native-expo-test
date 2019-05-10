import React from "react";
import { List } from "native-base";
import { RentalsListItem } from "../listItems";

function RentalsList(props) {
  return (
    <List
      scrollEnabled={false}
      dataArray={props.categories}
      renderRow={category => (
        <RentalsListItem {...category} onPress={text => props.onItemPress(text)} />
      )}
    />
  );
}

export default RentalsList;
