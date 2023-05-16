import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
//터미널에서 expo install expo-linear-gradient(그라데이션)
import { LinearGradient } from "expo-linear-gradient";
//터미널에서 expo install expo-font(글꼴)
import { useFonts } from "expo-font";
//터미널에서 expo install expo-app-loading
import AppLoading from "expo-app-loading";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  /*app 컴포넌트에 숫자가 확인되었는지 추척 상태 
  숫자 여부에 따라 화면 전환*/
  const [userNumber, setUserNumber] = useState();
  //게임오버 여부상태 (게임이 시작되지 않은건 오버된 상태 -> 초기값 true)
  const [gameIsOver, setGameIsOver] = useState(true);
  //게임라운드 상태
  const [guessRounds, setGuessRounds] = useState(0);

  //글꼴 호출
  //const [] => []안 첫번째 값은 boolean
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />; //글꼴이 로딩될때 까지 로딩화면
  }

  //숫자 여부 함수
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  //게임오버 함수
  function gameOverHandler() {
    setGameIsOver(true);
  }

  //새로운 게임 시작 함수
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //게임실행화면, null/0 => 거짓
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  //게임오버 화면 (게임오버 여부 상태 와 숫자 여부 상태)
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* SafeAreaView => 자동으로 상단바와의 거리 지정 (노치와의 거리)*/}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // 화면이 최대한의 공간차지하도록 스타일
  rootScreen: {
    //View => 콘텐츠가 들어갈 만큼의 공간만 차지 -> 전체 배경을 지정하고 싶을때 flex 1
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
