import React, { Component } from "react";
import { ImageBackground, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Icon, Text, Content, Form, Item, Label, Input, ListItem, Body, Right, Switch, View } from "native-base";
import ModalHeader from '../headers/ModalHeader';
import Modal from "react-native-modal";
import CheckListModal from "./CheckListModal";
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";
import AlertModal from "./AlertModal";

class TaskDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListModalIsOpen: false,
      alertModalIsOpen: false,
    }
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  openAlertModal() {
    this.setState({
      alertModalIsOpen: true
    });
  }

  closeAlertModal() {
    this.setState({
      alertModalIsOpen: false
    })
  }

  onSwitchChange(val) {
    const { onDetailChange, taskDetail } =this.props
    if (val) {
      onDetailChange({
        ...taskDetail,
        alert: new Date().toString(),
      })
    } else {
      onDetailChange({
        ...taskDetail,
        alert: ''
      })
    }
  }

  onDateChange(val) {
    const { onDetailChange, taskDetail } = this.props
    onDetailChange({
      ...taskDetail,
      alert: val.toString()
    })
  }

  openCheckListModal() {
    this.setState({
      checkListModalIsOpen: true
    });
  }

  closeCheckListModal() {
    this.setState({
      checkListModalIsOpen: false
    });
  }

  render() {
    const { selectedTaskId, taskDetail, taskDetailModalIsOpen, onDetailChange, checkList, onCreateCheckList } = this.props;
    const disabled = !!selectedTaskId;
    const checkListDetail = this.props.getCheckListDetail(taskDetail && taskDetail.check_list_id)
    const {lang} = this.state
    return (
      <Modal
        style={{ flex: 1, margin: 0 }}
        isVisible={taskDetailModalIsOpen}
        backdropColor={'transparent'}
        backdropOpacity={0}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => this.props.closeTaskDetailModal()}
      >
        <ImageBackground source={require('../../assets/images/background.png')} resizeMode='cover' style={styles.backgroundImage}>
          <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
            <ModalHeader
              title={disabled ? multilingual.TASK_DETAILS[lang] : multilingual.NEW_TASK[lang]}
              leftText={disabled ? multilingual.TO_DO[lang] : multilingual.CANCEL[lang]}
              onLeftPress={() => this.props.closeTaskDetailModal()}
              rightText={disabled
                ? taskDetail.checked === '1'
                  ? multilingual.INCOMPLETE[lang]
                  : multilingual.COMPLETE[lang]
                : multilingual.ADD[lang]}
              onRightPress={() => disabled ? this.props.onComplete(taskDetail.todo_list_id) : this.props.onAddTask(taskDetail)}
            />
            {taskDetail && taskDetail.checked === '1' && <Button full success iconLeft activeOpacity={1}>
              <Icon name='checkmark' />
              <Text>{multilingual.COMPLETE[lang]}</Text>
            </Button>}
            <Content style={styles.content}>
              <Form>
                <Item stackedLabel>
                  <Label>{multilingual.TITLE[lang]}</Label>
                  <Input defaultValue={taskDetail ? taskDetail.name : ''} onChangeText={text => onDetailChange({...taskDetail, name: text})} />
                </Item>
              </Form>
              <ListItem icon>
                <Body>
                  <Text>{multilingual.REMIND_ME_ON_A_DAY[lang]}</Text>
                </Body>
                <Right>
                  <Switch value={taskDetail && !!taskDetail.alert} onValueChange={(val) => this.onSwitchChange(val)} />
                </Right>
              </ListItem>
              {taskDetail && !!taskDetail.alert && <ListItem icon>
                <Body>
                  <Text>{multilingual.ALERT[lang]}</Text>
                </Body>
                <Right>
                  <Button onPress={() => this.openAlertModal()} transparent>
                    <Text style={styles.checkListText} numberOfLines={1}>
                      {taskDetail.alert}
                    </Text>
                    <Icon active name="arrow-forward" style={styles.rightIcon} />
                  </Button>
                </Right>
              </ListItem>}
              <ListItem icon>
                <Body>
                  <Text>{multilingual.CHECKLIST[lang]}</Text>
                </Body>
                <Right>
                  <Button onPress={() => this.openCheckListModal()} transparent>
                    <Text style={styles.checkListText} numberOfLines={1}>
                      {taskDetail && taskDetail.check_list_id && checkListDetail ? checkListDetail.name : 'select checklist'}
                    </Text>
                    <Icon active name="arrow-forward" style={styles.rightIcon} />
                  </Button>
                </Right>
              </ListItem>
              <Form>
                <Item stackedLabel>
                  <Label>URL</Label>
                  <Input defaultValue={taskDetail ? taskDetail.url : ''} onChangeText={text => onDetailChange({...taskDetail, url: text})} />
                  {/* <Button onPress={() => 1} transparent>
                    <Text>GO</Text>
                  </Button> */}
                </Item>
                <Item stackedLabel last>
                  <Label>{multilingual.NOTES[lang]}</Label>
                  <Input defaultValue={taskDetail ? taskDetail.notes : ''} onChangeText={text => onDetailChange({...taskDetail, notes: text})} />
                </Item>
              </Form>
              {disabled && <View style={styles.buttonContainer}>
                <Button style={styles.delButton} onPress={() => this.props.onDelete(taskDetail.todo_list_id)}>
                  <Text>{multilingual.DELETE_TASK[lang]}</Text>
                </Button>
                <Button style={styles.utdButton} onPress={() => this.props.onUpdateTask(taskDetail)}>
                  <Text>{multilingual.UPDATE_TASK[lang]}</Text>
                </Button>
              </View>}
            </Content>
          </SafeAreaView>
        </ImageBackground>
        <CheckListModal
          modalIsOpen={this.state.checkListModalIsOpen}
          closeModal={() => this.closeCheckListModal()}
          checkList={checkList}
          onCreateCheckList={onCreateCheckList}
          onSelectCheckList={check_list_id => onDetailChange({...taskDetail, check_list_id})}
          activeCheckListId={taskDetail && taskDetail.check_list_id}
        />
        {this.state.alertModalIsOpen && <AlertModal
          modalIsOpen={this.state.alertModalIsOpen}
          closeModal={() => this.closeAlertModal()}
          date={taskDetail ? taskDetail.alert : ''}
          onDateChange={(val) => this.onDateChange(val)}
        />}
      </Modal>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent'
  },
  rightIcon: {
    marginRight: 0,
    color: '#8f8e94',
  },
  checkListText: {
    width: Platform.OS === 'ios' ? 200 : 175,
    color: '#8f8e94',
    textAlign: 'right'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: null,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  delButton: {
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ea1b36',
    marginHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  utdButton: {
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0d9ddb',
    marginHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
};

export default TaskDetailModal;
