//npm add react-native-modal or npm i react-native-modal
import { StyleSheet, SafeAreaView, View } from "react-native";
import Modal from "react-native-modal";
import ModalContent from "./ModalContent";

function MyModal({ open, close }) {
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        isVisible={open}
        transparent={true}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        animationInTiming={5}
        animationOutTiming={5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={styles.modal}>
          <ModalContent close={close} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default MyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
