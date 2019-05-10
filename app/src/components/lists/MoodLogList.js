import React from "react";
import { List } from "native-base";
import { MoodLogListItem } from "../listItems";

function MoodLogList(props) {
  return (
    <List
      showsVerticalScrollIndicator={false}
      dataArray={props.moodLog}
      renderRow={moodLog => <MoodLogListItem {...moodLog} {...props} />}
    />
  );
}

export default MoodLogList;
