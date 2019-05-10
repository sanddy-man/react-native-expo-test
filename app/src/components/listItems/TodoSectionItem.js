import React from "react";
import { Body, Text, ListItem, Right, Icon } from "native-base";


function TodoSectionItem(props) {
  return (
    <ListItem icon style={styles.container}>
      <Body>
        <Text style={styles.title}>{props.title}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

const styles = {
  container: {
    backgroundColor: '#fcfbf8',
    marginLeft: 0,
    paddingLeft: 16,
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 20,
    fontWeight: 'bold',
    color: "#004877"
  },
};

export default TodoSectionItem;
