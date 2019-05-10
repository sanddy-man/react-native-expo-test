import React from "react";
import { SectionList } from 'react-native';
// import { List, Text } from "native-base";
import { TodoListItem } from "../listItems";
import TodoSectionItem from "../listItems/TodoSectionItem";

function TodoList(props) {
  return (
    // <List
    //   showsVerticalScrollIndicator={false}
    //   dataArray={props.content}
    //   renderRow={content => <TodoListItem
    //     {...content}
    //     onCheckTask={taskId => props.onCheckTask(taskId)}
    //     onPress={taskId => props.onPress(taskId)}
    //   />}
    //   itemDivider
    // />
    <SectionList
      renderItem={({item, index, section}) => <TodoListItem
        {...item}
        onCheckTask={taskId => props.onCheckTask(taskId)}
        onPress={taskId => props.onPress(taskId)}
      />}
      renderSectionHeader={({section: {title}}) => (
        <TodoSectionItem title={title} />
      )}
      sections={props.content}
      keyExtractor={(item, index) => item + index}
      stickySectionHeadersEnabled={true}
    />
  );
}

export default TodoList;
