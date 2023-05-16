import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

//숫자를 입력할 게임 화면
function StartGameScreen({ onPickNumber }) {
  //입력된 값 상태
  const [enteredNumber, setEnteredNumber] = useState("");

  //숫자입력 함수(입력시 rn이 자동으로 매개변수 가져온다 -> enteredText)
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  //입력칸 초기화 함수
  function resetInputHandler() {
    setEnteredNumber("");
  }

  //confirm버튼 함수
  function confirmInputHandler() {
    //입력값 유효성 검사
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //경고창 출력(Alert.prompt -> 대화창)
      Alert.alert("유효하지 않은 숫자!", "1과 99사이의 숫자를 입력하세요.", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    //숫자가 유효할때마다 pickedNumberHandler함수 실행
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>숫자를 입력하세요.</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad" //textInput이니 숫자라도 문자열
          autoCapitalize="none" //앞글자 자동 대문자
          autoCorrect={false} //글 자동 수정
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          {/* 커스텀 버튼 컴포넌트 */}
          <View style={styles.buttonContainer}>
            <PrimaryButton otherOnPress={resetInputHandler}>
              Reset
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton otherOnPress={confirmInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row", //가로정렬
  },
  buttonContainer: {
    flex: 1, //최대한 공간 늘려서 차치
  },
});
