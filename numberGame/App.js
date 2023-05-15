import { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
//터미널에서 expo install expo-linear-gradient(그라데이션)
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";

export default function App() {
  /*app 컴포넌트에 숫자가 확인되었는지 추척 상태 
  숫자 여부에 따라 화면 전환*/
  const [userNumber, setUserNumber] = useState();

  //숫자 여부 함수
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //null/0 => 거짓
  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    //View => 콘텐츠가 들어갈 만큼의 공간만 차지 -> 전체 배경을 지정하고 싶을때 flex 1
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
