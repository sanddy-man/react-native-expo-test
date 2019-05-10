import React from "react";
import { ImageBackground } from "react-native";
import { Body, Header, Title, Right, Left, Button, Icon, Container, Content, Segment, Text } from 'native-base';
import { Lists } from "../../components";
import styles from "./styles";
import multilingual from "../../config/multilingual";

function LibraryHome(props) {
  if (props.activeTabItem === "All"){
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>{multilingual.LIBRARY[props.lang]}</Title>
          </Body>
          <Right>
            <Button onPress={() => props.onSearch("")} transparent>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>
        <Segment style={{paddingLeft:10, paddingRight:10}}>
          <Button first active style={{alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}}>
            <Text>{multilingual.ALL[props.lang]}</Text>
          </Button>
          <Button onPress={() => props.onTabItemPress("Favorites")} last style={{alignItems:"center", justifyContent:"center", width:"50%"}}>
            <Text>{multilingual.FAVORITES[props.lang]}</Text>
          </Button>
        </Segment>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <Content style={styles.content}>
            <Lists.RentalsList style={styles.topicList}
              categories={props.categories}
              onItemPress={text => props.onItemPress(text)}
            />
            <Text style={styles.heading}>{multilingual.ALL[props.lang]}</Text>
            <Lists.StudyTasksList
              updateFavorite={(content_id) => props.updateFavorite(content_id)}
              favoriteOnly={props.favoriteOnly}
              content={props.content}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  } else {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>{multilingual.LIBRARY[props.lang]}</Title>
          </Body>
          <Right>
            <Button onPress={() => props.onSearch("")} transparent>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>
        <Segment style={{paddingLeft:10, paddingRight:10}}>
          <Button first onPress={() => props.onTabItemPress("All")} style={{alignItems:"center", justifyContent:"center", width:"50%"}}>
            <Text>{multilingual.ALL[props.lang]}</Text>
          </Button>
          <Button last active style={{alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}}>
            <Text>{multilingual.FAVORITES[props.lang]}</Text>
          </Button>
        </Segment>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <Content style={styles.content}>
            <Lists.StudyTasksList
              updateFavorite={(content_id) => props.updateFavorite(content_id)}
              favoriteOnly={props.favoriteOnly}
              content={props.content}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default LibraryHome;
