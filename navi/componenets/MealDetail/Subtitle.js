import { View, Text, StyleSheet } from "react-native";

//부제목
function Subtitle({ children }) {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subContainer: {
    borderBottomColor: "#dfb184",
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
  },
  subtitle: {
    color: "#dfb184",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
