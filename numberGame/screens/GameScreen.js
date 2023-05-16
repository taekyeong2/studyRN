import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

//난수생성 (exclude => 난수 생성 중 배제할 수)
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

//초기 최소값 최대값
let minBoundary = 1;
let maxBoundary = 100;

//추측된 숫자와 숫자 피드백 화면
function GameScreen({ userNumber, onGameOver }) {
  //난수 초기값
  const initialGuess = generateRandomBetween(1, 100, userNumber); // 컴포넌트 함수가 실행된 후에 useEffect가 실행
  // => useEffect는 리렌더링 끝난 두 실행됨
  // 업데이트 되기전 상태 버튼을 클릭
  //난수 상태
  const [currentGuess, setCUrrentGuess] = useState(initialGuess);

  /*useEffect => 의존성을 추가해 함수 언제 실행할지 제어 가능
                함수에서 사용되는 변수와 값 모두 의존성으로 추가 해야한다.*/
  //숫자가 맞을때 게임오버함수실행
  useEffect(() => {
    if (currentGuess === userNumber) {
      //gameOverHandler함수 실행
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]); // 의존성에 추가된 프로퍼티의 값이 바뀔때마다 함수실행

  //새게임이 시작될때마다 최소값,최대값 변수 재설정
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []); //빈 의존성을 통해 첨 렌더링 될때만 실행

  //버튼 클릭시 새로운 난수 생성
  function nextGuessHandler(direction) {
    //direction => 'lower', 'greater'

    //만약 잘못된 피드백을 줄때 => 무한루프 방지
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("거짓말하지마세요.", "거짓말은 잘못된 행동입니다.", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      /*Math.random()의 범위가 0이상 1미만 이므로 -1 X */
      maxBoundary = currentGuess;
    } else {
      /*하한값은 상한값과 달리 가능한 결과값에 포함됨으로 +1 */
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCUrrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          {/* bind => 매개변수값 사전에 구성 
          bind(함수에서의 this, 함수의 첫번째 매개변수값) */}
          <View style={styles.buttonContainer}>
            <PrimaryButton otherOnPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              otherOnPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View>Log Round</View> */}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
});
