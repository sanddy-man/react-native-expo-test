import React from "react";
import { Body, Text, ListItem, CheckBox } from "native-base";


function TodoListItem(props) {
  var cardFormat = "article";
  var cardImage = require("../../assets/images/article.png");
  if (props.format === "Video"){
    cardFormat = props.format;
    cardImage = require("../../assets/images/video.png");
  }

  return (
    <ListItem onPress={() => props.onPress(props.todo_list_id)}>
      <CheckBox checked={props.checked == "1"} onPress={() => props.onCheckTask(props.todo_list_id)}/>
      {/* <CheckBox checked={props.checked == "1"} /> */}
      <Body>
        <Text>{props.name}</Text>
      </Body>
    </ListItem>
  );
}

const styles = {
  container: {
    flexDirection: "row"
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 20,
    color: "#000"
  },
  image: {
    height: 44,
    width: 36,
    marginRight: 10
  },
  duration: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#5F5F5F",
    marginTop: 4
  },
  categories: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#5F5F5F",
    marginTop: 2
  }
};

export default TodoListItem;
