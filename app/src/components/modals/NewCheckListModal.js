import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ImageBackground } from 'react-native';
import { Button, Icon, Text, Content, Form, Item, Label, Input, ListItem, Body, Right, Switch, List } from "native-base";
import ModalHeader from '../headers/ModalHeader';
import Modal from "react-native-modal";

class NewCheckListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  createCheckList() {
    if (!this.state.name) {
      alert('Please fill name');
      return;
    }
    const { onCreateCheckList, closeModal } = this.props;
    onCreateCheckList({ name: this.state.name });
    closeModal()
  }

  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <Modal
        style={{ flex: 1, margin: 0 }}
        isVisible={modalIsOpen}
        backdropColor={'transparent'}
        backdropOpacity={0}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => closeModal()}
      >
        <ImageBackground source={require('../../assets/images/background.png')} resizeMode='cover' style={styles.backgroundImage}>
          <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
            <ModalHeader
              title={'New Checklist'}
              leftText={'Checklist'}
              onLeftPress={() => closeModal()}
              rightText={'Create'}
              onRightPress={() => this.createCheckList()}
            />
            <Content style={styles.content}>
              <Form>
                <Item stackedLabel>
                  <Label>Checklist Name</Label>
                  <Input defaultValue={this.state.name} onChangeText={text => this.setState({ name: text })} />
                </Item>
              </Form>
            </Content>
          </SafeAreaView>
        </ImageBackground>
      </Modal>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    paddingTop: 16,
  },
  rightIcon: {
    marginRight: 0,
    color: '#8f8e94',
  },
  checkListText: {
    width: 200,
    color: '#8f8e94',
    textAlign: 'right'
  },
  checkList: {
    backgroundColor: '#fff',
    marginLeft: 0,
    paddingLeft: 16
  },
  button: {
    marginTop: 50,
  },
  checkIcon: {
    fontSize: 40,
    color: '#007aff'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: null,
  },
};

export default NewCheckListModal;
