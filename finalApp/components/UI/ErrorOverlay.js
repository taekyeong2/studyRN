import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

//로딩화면
function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>오류가 발생했습니다.</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
