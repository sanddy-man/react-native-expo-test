import React from "react";
import { View, Image, TouchableHighlight, TouchableOpacity, Linking, Dimensions } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";


function loadContent(url){
  Linking.openURL(url);
}

function StudyTasksListItem(props) {
  var cardFormat = "article";
  var cardImage = require("../../assets/images/article.png");
  var heartImage = require("../../assets/images/emptyheart.png");

  if (props.format === "Video"){
    cardFormat = props.format;
    cardImage = require("../../assets/images/video.png");
  }

  if (props.favorite_content_id != "NULL"){
    heartImage = require("../../assets/images/fullheart.png");
  }

  return (
    <Card>
      <CardItem>
        <Body>
          <TouchableOpacity onPress={() => loadContent(props.url)}>
            <View style={styles.container}>
              <Image
                source={cardImage}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {props.title}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.duration}>
                  {props.duration} min
                </Text>
                <Text style={styles.categories}>
                  {props.categories}
                </Text>
              </View>
              <View style={styles.textContainerRight}>
                <TouchableHighlight
                  onPress={() => props.updateFavorite(props.content_id)}
                  underlayColor="#EFF1F5"
                >
                  <Image
                    source={heartImage}
                    style={styles.heart}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </TouchableOpacity>
        </Body>
      </CardItem>
    </Card>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    width: '100%'
  },
  textContainer: {
    flex: 1
  },
  textContainerRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight:10
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 20,
    color: "#000",
    width: Dimensions.get('window').width - 100
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
  heart: {
    marginTop: 15,
    width:27,
    height:24
  },
  categories: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#5F5F5F",
    marginTop: 2
  }
};

export default StudyTasksListItem;
