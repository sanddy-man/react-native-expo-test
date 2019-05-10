import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ImageBackground } from 'react-native';
import { Button, Icon, Text, Content, Form, Item, Label, Input, ListItem, Body, Right, Switch, List } from "native-base";
import ModalHeader from '../headers/ModalHeader';
import Modal from "react-native-modal";
import NewCheckListModal from "./NewCheckListModal";

class CheckListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newModalIsOpen: false
    }
  }

  openNewModal() {
    this.setState({
      newModalIsOpen: true
    })
  }

  closeNewModal() {
    this.setState({
      newModalIsOpen: false
    })
  }

  render() {
    const { checkList, modalIsOpen, closeModal, onSelectCheckList, activeCheckListId, onCreateCheckList } = this.props;
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
              title={'Checklist'}
              leftText={'New Task'}
              onLeftPress={() => closeModal()}
              rightText={null}
              onRightPress={() => {}}
            />
            <Content style={styles.content}>
              {
                checkList.map((content, index) => <ListItem
                  key={index}
                  icon
                  style={styles.checkList}
                  onPress={() => onSelectCheckList(content.check_list_id + '')}>
                  <Body>
                    <Text>{content.name}</Text>
                  </Body>
                  <Right>
                    {activeCheckListId === content.check_list_id && <Icon name="ios-checkmark" style={styles.checkIcon} />}
                  </Right>
                </ListItem>)
              }
              <Button full style={styles.button} onPress={() => this.openNewModal()}>
                <Text>Add new</Text>
              </Button>
            </Content>
          </SafeAreaView>
        </ImageBackground>
        <NewCheckListModal
          modalIsOpen={this.state.newModalIsOpen}
          closeModal={() => this.closeNewModal()}
          onCreateCheckList={onCreateCheckList}
        />
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

export default CheckListModal;
