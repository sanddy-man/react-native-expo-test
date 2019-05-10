import React from "react";
import { View, Image, TouchableOpacity, } from "react-native";
import { ListItem, Body, Text, Icon } from "native-base";
import Moment from 'moment';

let faceIcons = {
  1: require('../../assets/images/face1.png'),
  2: require('../../assets/images/face2.png'),
  3: require('../../assets/images/face3.png'),
  4: require('../../assets/images/face4.png'),
  5: require('../../assets/images/face5.png')
}

function MoodLogListItem(props) {
  Moment.locale('en');
  var dt = props.timestamp;
  const logDay = Moment(dt).local()
  const today = Moment().local()
  const hourDiff = today.diff(logDay, 'hours')

  return (
    <ListItem rightIcon={
      <Icon
        name={'chevron'}
        size={20}
      />
    }>
      <Body>
        <TouchableOpacity style={styles.container} onPress={() => {
          props.navigation.navigate("_logMoodResult", {
            logData: { ...props },
            editMoodLog: props.editMoodLog,
            editMode: true,
          })
        }} disabled={hourDiff > 24}>
          <View style={styles.textContainer}>
            <Text style={styles.time}>
              {Moment(dt).local().format('hh:mm A')}
            </Text>
            <Text style={styles.date}>
              {Moment(dt).local().format('MMM D')}
            </Text>
          </View>
          <View style={styles.faceContainer}>
            <Image
              style={{width: 30, height: 30, marginRight:10, marginTop:5}}
              source={faceIcons[props.personal_feeling]}
            />
            <Image
              style={{width: 30, height: 30, marginTop:5}}
              source={faceIcons[props.baby_feeling]}
            />
          </View>
          <View>
            <Icon active name="arrow-forward" style={{ color: '#a7a5a6', marginTop: 5 }} />
          </View>
        </TouchableOpacity>
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
  faceContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  time: {
    fontFamily: "AvenirMedium",
    fontSize: 13,
    color: "#4f4c4d"
  },
  date: {
    fontFamily: "AvenirMedium",
    fontSize: 17,
    color: "#231f20"
  }
};

export default MoodLogListItem;
