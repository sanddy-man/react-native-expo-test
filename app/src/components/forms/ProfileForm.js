import React from "react";
import { View } from "react-native";
import { Form, Text, List, ListItem, SwipeRow, Button, Icon } from "native-base";
import Swipeout from 'react-native-swipeout';
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import multilingual from "../../config/multilingual";

/*<View style={styles.submitButtonContainer}>
        <SmButton
          busy={props.busy}
          text={"Save"}
          onPress={() => props.onSubmitPress()}
        />
      </View>*/

function testFunc2(){

}

function testFunc(){

}

function ProfileForm(props) {
  const {lang} = props
  return (
    <Form>
      <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
        <Text>{multilingual.CHILD[lang]}</Text>
      </View>
      <UnderlinedInput
        disabled={true}
        label={Constants.NAME}
        value={props.profileData.name}
        editable={false}
        onChangeText={text => props.onNameChange(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        disabled={true}
        label={Constants.BIRTH_DATE}
        value={props.profileData.dob}
        editable={false}
        onChangeText={text => props.onNameChange(text)}
      />
      <View style={styles.separator} />

      <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
        <Text onPress={() => props.onAddDiagnosis()}>{multilingual.ADD_DIAGNOSIS[lang] + ' +'}</Text>
      </View>

      <List
        scrollEnabled={false}
        dataArray={props.diagnosis}
        renderRow={diag => (
          <Swipeout right={[{component: <Button danger onPress={() => props.delDiagnosis(diag)}>
            <Icon active name="trash" />
          </Button>}]} backgroundColor='transparent' buttonWidth={46}>
            <ListItem onPress={() => props.onEditDiagnosis(diag)}>
              <Text>{diag.name}</Text>
            </ListItem>
          </Swipeout>
        )}
      />

      <View style={styles.separator} />

      <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
        <Text onPress={() => props.onAddMedication()}>{multilingual.ADD[lang] + ' ' + multilingual.MEDICATION[lang] + ' +'}</Text>
      </View>

      <List
        scrollEnabled={false}
        dataArray={props.medications}
        renderRow={medication => (
          <Swipeout right={[{component: <Button danger onPress={() => props.delMedication(medication)}>
            <Icon active name="trash" />
          </Button>}]} backgroundColor='transparent' buttonWidth={46}>
            <ListItem onPress={() => props.onEditMedication(medication)}>
              <Text>{medication.prescriptionName}, {medication.dosage}, {medication.dosageInstructions}</Text>
            </ListItem>
          </Swipeout>
        )}
      />

      <View style={styles.separator} />

      <View style={{ marginTop: 10, fontSize:24, color:'#0d9ddb' }}>
        <Text onPress={() => props.onAddDoctor()}>{multilingual.ADD_DOCTOR[lang] + ' +'}</Text>
      </View>

      <List
        scrollEnabled={false}
        dataArray={props.doctors}
        renderRow={doctor => (
          <Swipeout right={[{component: <Button danger onPress={() => props.delDoctor(doctor)}>
            <Icon active name="trash" />
          </Button>}]} backgroundColor='transparent' buttonWidth={46}>
            <ListItem onPress={() => props.onEditDoctor(doctor)}>
              <Text>{doctor.type}, {doctor.name}, {doctor.number}</Text>
            </ListItem>
          </Swipeout>
        )}
      />

      <View style={{ marginTop: 20, fontSize:24, color:'#0d9ddb' }}>
        <Text>Me</Text>
      </View>
      <UnderlinedInput
        disabled={props.busy}
        label={multilingual.ADD_YOUR_NAME[lang]}
        defaultValue={props.name}
        onChangeText={text => props.onNameChange(text)}
      />

      <UnderlinedInput
        disabled={true}
        keyboardType="email-address"
        label={multilingual.EMAIL[lang]}
        value={props.profileData.email}
        onChangeText={text => props.onMobileNumberChange(text)}
      />

      <View style={styles.separator} />
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  },
  submitButtonContainer: {
    alignSelf: "center",
    marginBottom: 20
  }
};

export default ProfileForm;
