import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ImageBackground, DatePickerIOS, Platform } from 'react-native';
import { Content } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalHeader from '../headers/ModalHeader';
import Modal from "react-native-modal";

class AlertModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      androidDatePickerIsOpen: false
    }
  }

  openAndroidPicker() {
    this.setState({
      androidDatePickerIsOpen: true
    })
  }

  closeAndroidPicker() {
    this.setState({
      androidDatePickerIsOpen: false
    })
    setTimeout(() => {
      this.props.closeModal()
    }, 300);
  }

  confirmAndroidPicker(val) {
    this.props.onDateChange(val)
    setTimeout(() => {
      this.props.closeModal()
    }, 100);
  }

  componentDidMount() {
    setTimeout(() => {
      this.openAndroidPicker()
    }, 300);
  }

  render() {
    const { modalIsOpen, closeModal, } = this.props;
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
              title={'Alert'}
              leftText={'New Task'}
              onLeftPress={() => closeModal()}
              rightText={null}
              onRightPress={() => {}}
            />
            <Content style={styles.content}>
              {
                Platform.OS === 'ios'
                ? <DatePickerIOS
                  date={new Date(this.props.date)}
                  onDateChange={this.props.onDateChange}
                />
                : <DateTimePicker
                  isVisible={this.state.androidDatePickerIsOpen}
                  onConfirm={(val) => this.confirmAndroidPicker(val)}
                  onCancel={() => this.closeAndroidPicker()}
                  mode='datetime'
                />
              }
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

export default AlertModal;
