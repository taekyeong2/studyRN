import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";

//카테고리들 (타일들)
function CategoryGridTile({ title, color, onPress }) {
  //useNavigation => screen으로 등록되지 않은 컴포넌트 함수내에서 navigation 사용 가능
  //const navigation = useNavigation();
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPress : null,
        ]}
        onPress={onPress}
      >
        {/* [기존 스타일 , {병합할 스타일 요소}] */}
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white", //backgroundcolor를 설정해야지 ios의 그림자가 보인다.
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPress: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
