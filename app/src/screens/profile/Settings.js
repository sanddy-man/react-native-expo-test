import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';
import { Constants } from "../../config";
import { Permissions, Notifications, SecureStore } from 'expo';
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

const PUSH_ENDPOINT = Constants.API_ROOT + "/registerPushNotifications";

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  SecureStore.getItemAsync("jwt").then((value) => {
    if (value != null){
      return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + value,
        },
        body: JSON.stringify({
          token: token,
        }),
      });
    }
  }).done();
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {notificationsOn:false}
    this.toggleNotifications = function(){
      if (!this.state.notificationsOn){
        registerForPushNotificationsAsync();
      }

      this.setState({
        notificationsOn: !this.state.notificationsOn
      });
    }
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  render() {
    const { profile } = this.props.navigation.state.params
    const {lang} = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
              <Text>{multilingual.PROFILE[lang]}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{multilingual.SETTINGS[lang]}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <ListItem itemHeader>
            <Text>{multilingual.ACCOUNT[lang]}</Text>
          </ListItem>
          <ListItem>
            <Left>
              <Text>{multilingual.NOTIFICATIONS[lang]}</Text>
            </Left>
            <Body>
            </Body>
            <Right>
              <Switch onValueChange={() => this.toggleNotifications()} value={this.state.notificationsOn} />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate('_changePassword', { profile })}>
            <Left>
              <Text>{multilingual.CHANGE_PASSWORD[lang]}</Text>
            </Left>
            <Body>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <Body style={{flexDirection: "row", justifyContent: "center", marginTop:250}}>
            <Button rounded onPress={() => this.props.navigation.state.params.onLogout()}>
              <Text>{multilingual.LOG_OUT[lang]}</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}

export default Settings;