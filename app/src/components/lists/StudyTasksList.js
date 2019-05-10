import React from "react";
import { List } from "native-base";
import { StudyTasksListItem } from "../listItems";

function StudyTasksList(props) {
  var content = [];

  for (var i = 0; i < props.content.length; i++){
  	if (props.favoriteOnly){
  	  if (props.content[i].favorite_content_id != "NULL"){
  	  	content.push(props.content[i]);
  	  }
  	  
  	  continue;
  	}

  	content.push(props.content[i]);
  }

  return (
    <List
      showsVerticalScrollIndicator={false}
      dataArray={content}
      renderRow={content => <StudyTasksListItem updateFavorite={(content_id) => props.updateFavorite(content_id)} {...content} />}
    />
  );
}

export default StudyTasksList;
