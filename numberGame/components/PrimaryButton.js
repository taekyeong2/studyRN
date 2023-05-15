import { View, Text, Pressable, StyleSheet } from "react-native";

//커스텀 버튼
function PrimaryButton({ children }) {
  //onPress(누를때 이벤트) 함수
  function pressHandler() {
    console.log("눌렀다");
  }

  return (
    <View style={styles.buttonOuterContainer}>
      {/* pressable 의 style은 화살표 함수를 쓸 수 있다. 
      스타일은 []배열로 나열해 여러개 저장가능*/}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", //컨테이너 밖으로 나가지 못하게
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
