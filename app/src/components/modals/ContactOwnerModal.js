import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Constants } from "../../config";
import { Buttons } from "../../components";

function ContactOwnerModal(props) {
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Feather name="phone" style={styles.icon} />
        </View>

        <Text style={styles.heading}>{Constants.HI_THERE}</Text>
        <Text style={styles.body}>{Constants.CONTACT_PERSON_TEXT}</Text>
        <Text style={styles.boldBody}>Hendrix</Text>
        <Text style={styles.boldBody}>Call: 81 7611 1233</Text>

        <View style={{ marginTop: 10, alignSelf: "stretch" }}>
          <Buttons.LgButton
            text={Constants.CALL}
            onPress={() => props.onCallPress()}
          />
        </View>
      </View>
    </Modal>
  );
}

const CIRCLE_DIMS = 50;

const styles = {
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 16,
    alignItems: "center"
  },
  iconContainer: {
    height: CIRCLE_DIMS,
    width: CIRCLE_DIMS,
    borderRadius: CIRCLE_DIMS / 2,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 25,
    color: "#000"
  },
  heading: {
    fontFamily: "LatoBlack",
    fontSize: 20,
    color: "#000",
    marginTop: 10
  },
  body: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#A9A9A9",
    marginTop: 5,
    textAlign: "center"
  },
  boldBody: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#000",
    marginTop: 5
  }
};

export default ContactOwnerModal;
