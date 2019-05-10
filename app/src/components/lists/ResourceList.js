import React from "react";
import { List } from "native-base";
import { ResourceListItem } from "../listItems";

function ResourceList(props) {
  return (
    <List
      scrollEnabled={false}
      dataArray={props.categories}
      renderRow={category => (
        <ResourceListItem {...category} onPress={text => props.onItemPress(text)} />
      )}
    />
  );
}

export default ResourceList;
