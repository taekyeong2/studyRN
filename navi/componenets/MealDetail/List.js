import { View, Text, StyleSheet } from "react-native";

//상세화면 내용
function List({ data }) {
  return data.map((dataPoint) => (
    <View style={styles.listItem} key={dataPoint}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#dfb184",
  },
  itemText: {
    color: "#422300",
    textAlign: "center",
  },
});
