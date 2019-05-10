import React from "react";
import { View, ScrollView, WebView, ImageBackground } from "react-native";
import { Body, Header, Title, Right, Left, Button, Icon, Segment, Text } from 'native-base';
import { Tabs, Lists } from "../../components";
import moment from 'moment';
import multilingual from "../../config/multilingual";

function WellnessHome(props) {
  const {lang} = props
  if (props.activeTabItem === "Support"){
    return (
      <View style={styles.container}>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>{multilingual.WELLNESS[lang]}</Title>
          </Body>
          <Right>
            <Button onPress={() => props.onLogMood()} transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <Segment style={{paddingLeft:10, paddingRight:10}}>
            <Button first onPress={() => props.onTabItemPress("Mood Journal")} style={{alignItems:"center", justifyContent:"center", width:"50%"}}>
              <Text>{multilingual.MOOD_JOURNAL[lang]}</Text>
            </Button>
            <Button last active style={{alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}}>
              <Text>{multilingual.SUPPORT[lang]}</Text>
            </Button>
          </Segment>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage1} >
          <ScrollView style={styles.content}>
            <Lists.RentalsList style={styles.topicList}
              categories={props.categories}
              onItemPress={text => props.onItemPress(text)}
            />
            <Text style={styles.heading}>{multilingual.WELLNESS_INFO[lang]}</Text>
            <Lists.StudyTasksList
              content={props.content}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  } else {
    if (props.moodLog.length > 0){
      const lastLogDay = moment(props.moodLog[0].timestamp).local()
      const today = moment().local()
      const dayDiff = today.diff(lastLogDay, 'days')
      return (
        <View style={styles.container}>
          <Header>
            <Left>
            </Left>
            <Body>
              <Title>{multilingual.WELLNESS[lang]}</Title>
            </Body>
            <Right>
              <Button onPress={() => props.onLogMood()} transparent>
                <Icon name='add' />
              </Button>
            </Right>
          </Header>
          <Segment style={{paddingLeft:10, paddingRight:10}}>
            <Button first active style={{alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}}>
              <Text>{multilingual.MOOD_JOURNAL[lang]}</Text>
            </Button>
            <Button onPress={() => props.onTabItemPress("Support")} last style={{alignItems:"center", justifyContent:"center", width:"50%"}}>
              <Text>{multilingual.SUPPORT[lang]}</Text>
            </Button>
          </Segment>
          {dayDiff > 0 && <ImageBackground source={require("../../assets/images/bg.png")} style={styles.backgroundImage2} >
            <View style={styles.centered}>
              <Text style={styles.noLog}>{multilingual.MOOD_LOG_REMIND_DESCRIPTION[lang]}</Text>
              <Button style={styles.noLogButton} rounded onPress={() => props.onLogMood()}>
                <Text style={styles.noLogButtonText}>{multilingual.LOG_YOUR_MOOD_NOW[lang]}</Text>
              </Button>
            </View>
          </ImageBackground>}
          <ScrollView style={styles.logContent}>
            <Lists.MoodLogList
              moodLog={props.moodLog}
              navigation={props.navigation}
              editMoodLog={props.editMoodLog}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header>
            <Left>
            </Left>
            <Body>
              <Title>{multilingual.WELLNESS[lang]}</Title>
            </Body>
            <Right>
              <Button onPress={() => props.onLogMood()} transparent>
                <Icon name='add' />
              </Button>
            </Right>
          </Header>
          <Segment style={{paddingLeft:10, paddingRight:10}}>
            <Button first active style={{alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}}>
              <Text>{multilingual.MOOD_JOURNAL[lang]}</Text>
            </Button>
            <Button onPress={() => props.onTabItemPress("Support")} last style={{alignItems:"center", justifyContent:"center", width:"50%"}}>
              <Text>{multilingual.SUPPORT[lang]}</Text>
            </Button>
          </Segment>
          <ImageBackground source={require("../../assets/images/bg.png")} style={styles.backgroundImage2} >
            <View style={styles.centered}>
              <Text style={styles.noLog}>{multilingual.MOOD_LOG_REMIND_DESCRIPTION[lang]}</Text>
              <Button style={styles.noLogButton} rounded onPress={() => props.onLogMood()}>
                <Text style={styles.noLogButtonText}>{multilingual.LOG_YOUR_MOOD_NOW[lang]}</Text>
              </Button>
            </View>
          </ImageBackground>
          <ScrollView style={styles.content}>
            <View style={{ height: 250, marginTop: 10 }}>
              <WebView
                scrollEnabled={false}
                source={{uri: 'https://vimeo.com/312198567'}}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor:"#fcfbf8"
  },
  logContent: {
    flex: 1,
    backgroundColor:"#fcfbf8"
  },
  contentNoPadding: {
    flex: 1
  },
  backgroundImage1: {
    flex: 1,
    width: null,
    height: null
  },
  backgroundImage2: {
    width: null,
    height: null
  },
  heading: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5F5F5F",
    marginBottom:5
  },
  noLogButtonText: {
    fontFamily: "BGBold",
    fontSize: 20,
    color: "#fff"
  },
  noLogButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#0d9ddb',
    marginBottom:10,
    alignSelf: 'center',
    marginTop:10
  },
  noLog: {
    color:'#4f4c4d',
    fontSize:16,
    marginTop:10
  },
  centered: {
    padding:16,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default WellnessHome;
