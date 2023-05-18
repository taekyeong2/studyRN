import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

//식단정보
function MealItem({ title, imageUrl, duration, complexity, affordability }) {
  return (
    <View style={styles.MealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPress : null)}
      >
        <View style={styles.innerContainer}>
          <View>
            {/* 웹이미지 이용할땐 require() 말고 {uri : } 사용 + 가로세로 정의 필요 */}
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}m</Text>
            <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  MealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  innerContainer: {
    //ios 그림자 설정 하면서 모서리 둥글게 하기 위해
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    padding: 18,
    margin: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  buttonPress: {
    opacity: 0.5,
  },
});
