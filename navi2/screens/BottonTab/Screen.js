import { View, StatusBar, StyleSheet } from "react-native";

function Screen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161924",
  },
});
