import React, { Component } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Forms } from "../../components";
import { Body, Header, Title, Right, Left, Button, Icon } from 'native-base';
import { ImagePicker, Permissions, SecureStore } from 'expo';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ActionSheet from 'react-native-actionsheet'
import multilingual from "../../config/multilingual";
import { Constants } from "../../config";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      babyImage: Constants.STATIC_ROOT + this.props.profileData.babyImage,
      parentImage: Constants.STATIC_ROOT + this.props.profileData.userImage,
    };
  }

  // async componentDidMount() {
  //   const [babyImage, parentImage] = await Promise.all([
  //     SecureStore.getItemAsync(`${this.props.profileData.email.replace('@', '')}-babyImage`),
  //     SecureStore.getItemAsync(`${this.props.profileData.email.replace('@', '')}-parentImage`),
  //   ]);
  //   this.setState({
  //     babyImage: Constants.STATIC_ROOT + this.props.profileData.babyImage,
  //     parentImage: Constants.STATIC_ROOT + this.props.profileData.userImage,
  //   })
  // }

  showActionSheet = (index) => {
    this.index = index
    this.ActionSheet.show()
  }

  async pickImage(mode) {
    const [{ status: existingStatus }, { status: existingCameraStatus}] = await Promise.all([
      Permissions.getAsync(
        Permissions.CAMERA_ROLL
      ),
      Permissions.getAsync(
        Permissions.CAMERA
      )
    ]);
    let finalStatus = existingStatus;
    let finalCameraStatus = existingCameraStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted' || existingCameraStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status, status: cameraStatus } = await Promise.all([
        Permissions.askAsync(Permissions.CAMERA_ROLL),
        Permissions.askAsync(Permissions.CAMERA)
      ]);
      finalStatus = status;
      finalCameraStatus = cameraStatus;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted' || finalCameraStatus !== 'granted') {
      return;
    }

    let result = {}
    if (mode === 0) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
    } else if (mode === 1) {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
    } else {
      return
    }

    if (!result.cancelled) {
      if (this.index === 1) {
        // SecureStore.setItemAsync(`${this.props.profileData.email.replace('@', '')}-babyImage`, result.uri);
        this.setState({ babyImage: result.uri });
        this.props.uploadImageFile(result.uri, 'Baby');
      } else {
        // SecureStore.setItemAsync(`${this.props.profileData.email.replace('@', '')}-parentImage`, result.uri);
        this.setState({ parentImage: result.uri });
        this.props.uploadImageFile(result.uri, 'User');
      }
    }
  };

  render() {
    const props = this.props;
    // const userImage = Constants.STATIC_ROOT + props.profileData.userImage;
    // const babyImage = Constants.STATIC_ROOT + props.profileData.babyImage;

    let babyProfilePer = 0;
    if (props.profileData.name) {
      babyProfilePer += 20
    }
    if (props.profileData.dob) {
      babyProfilePer += 20
    }
    if (props.diagnosis && props.diagnosis.length > 0) {
      babyProfilePer += 20
    }
    if (props.doctors && props.doctors.length > 0) {
      babyProfilePer += 20
    }
    if (props.medications && props.medications.length > 0) {
      babyProfilePer += 20
    }
    return (
      <View style={styles.container}>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>{multilingual.PROFILE[props.lang]}</Title>
          </Body>
          <Right>
            <Button onPress={() => props.openSettings()} transparent>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
        >
        <ImageBackground source={require("../../assets/images/backgroundBlue.png")} style={styles.backgroundImage} >
          <View style={styles.center}>
            <View style={styles.navimage}>
              <AnimatedCircularProgress
                key={'circular1'}
                ref={(ref) => this.circular1 = ref}
                size={120}
                width={10}
                fill={babyProfilePer}
                tintColor="#fff"
                backgroundColor="#9ed8f1"
                lineCap='round'
                rotation={0}>
                {
                  (fill) => (
                    <View style={styles.innerCircular}>
                      {this.state.babyImage
                      ? <Image
                          style={styles.imageFull}
                          source={{ uri: this.state.babyImage }}
                          resizeMode='contain'
                        />
                      : <Image
                        style={styles.image}
                        source={require("../../assets/icons/baby-white.png")}
                        resizeMode='contain'
                      />}
                      <Text style={styles.fillText}>
                        {`${fill}%`}
                      </Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
              <TouchableOpacity onPress={() => this.showActionSheet(1)}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navimage}>
              <AnimatedCircularProgress
                key={'circular2'}
                ref={(ref) => this.circular2 = ref}
                size={120}
                width={10}
                fill={
                  props.profileData.email && props.name
                  ? 100
                  : 50
                }
                tintColor="#fff"
                backgroundColor="#9ed8f1"
                lineCap='round'
                rotation={0}>
                {
                  (fill) => (
                    <View style={styles.innerCircular}>
                      {this.state.parentImage
                      ? <Image
                          style={styles.imageFull}
                          source={{ uri: this.state.parentImage }}
                          resizeMode='contain'
                        />
                      : <Image
                        style={styles.image}
                        source={require("../../assets/icons/parent-white-no-gender.png")}
                        resizeMode='contain'
                      />}
                      <Text style={styles.fillText}>
                        {`${fill}%`}
                      </Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
              <TouchableOpacity onPress={() => this.showActionSheet(2)}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.completeText}>Profile Completeness</Text>
        </ImageBackground>
        <ImageBackground source={require("../../assets/images/background.png")} style={styles.backgroundImage} >
          <View style={styles.content}>
            <Forms.ProfileForm
              profileData={props.profileData}
              busy={props.formBusy}
              name={props.name}
              onNameChange={text => props.onNameChangeText(text)}
              mobileNumber={props.mobileNumber}
              onMobileNumberChange={text => props.onMobileNumberChange(text)}
              contactShare={props.contactShare}
              onContactShareChange={value => props.onContactShareChange(value)}
              locationEnabled={props.locationEnabled}
              onLocationEnabledChange={value =>
                props.onLocationEnabledChange(value)
              }
              onSubmitPress={() => props.onFormSubmitPress()}
              onAddMedication={() => props.onAddMedication()}
              onEditMedication={props.onEditMedication}
              medications={props.medications}
              onAddDiagnosis={() => props.onAddDiagnosis()}
              diagnosis={props.diagnosis}
              onEditDiagnosis={props.onEditDiagnosis}
              onAddDoctor={() => props.onAddDoctor()}
              doctors={props.doctors}
              delDiagnosis={props.delDiagnosis}
              delMedication={props.delMedication}
              delDoctor={props.delDoctor}
              onEditDoctor={props.onEditDoctor}
              lang={props.lang}
            />
          </View>
        </ImageBackground>
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['Take Photo', 'Choose From Library', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            /* do something */
            this.pickImage(index)
          }}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  logoutText: {
    fontFamily: "LatoRegular",
    fontSize: 17,
    color: "#000",
    textAlign: "center"
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  center: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height:250
  },
  navimage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    marginHorizontal: 40,
  },
  completeText: {
    position: 'absolute',
    bottom: 30,
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 12,
    borderRadius: 20,
  },
  imageFull: {
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.8,
  },
  innerCircular: {
    flex: 1,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fillText: {
    textAlign:'center',
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    width: '100%',
    bottom: 10,
  }
};

export default Profile;
