import React from "react";
import { Header, Left, Body, Title, Right, Button, Icon, Text } from "native-base";
import getHeaderContainerStyle from "./getHeaderContainerStyle";

function ModalHeader(props) {
  return (
    <Header transparent>
      <Left>
        <Button onPress={() => props.onLeftPress()} transparent>
          <Icon name='arrow-back' style={{ color: '#2E2F4F'}} />
          <Text style={{ color: '#2E2F4F'}}>{props.leftText}</Text>
        </Button>
      </Left>
      <Body>
        <Title style={{ color: '#2E2F4F'}}>{props.title}</Title>
      </Body>
      <Right>
        <Button onPress={() => props.onRightPress()} transparent>
          <Text style={{ color: '#2E2F4F'}}>{props.rightText}</Text>
        </Button>
      </Right>
    </Header>
  );
}

const styles = {
  title: {
    fontFamily: "LatoBold",
    fontSize: 18,
    color: "#000"
  }
};

export default ModalHeader;
