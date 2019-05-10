import React from "react";
import { View, ImageBackground } from "react-native";
import { Lists } from "../../components";
import { Body, Header, Title, Right, Left, Segment, Button, Text, Icon, Container, Content } from 'native-base';
import multilingual from "../../config/multilingual";

function ResourcesHome(props) {
  const {lang} = props
  return (
    <Container>
      <Header>
        <Left>
        </Left>
        <Body>
          <Title>{multilingual.RESOURCES[lang]}</Title>
        </Body>
        <Right>
          <Button onPress={() => props.onSearch("")} transparent>
            <Icon name='search' />
          </Button>
        </Right>
      </Header>
      <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
        <Content padder>
          <Lists.ResourceList style={styles.topicList}
            categories={props.categories}
            onItemPress={text => props.onItemPress(text)}
          />
        </Content>
      </ImageBackground>
    </Container>
  );
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
};

export default ResourcesHome;
