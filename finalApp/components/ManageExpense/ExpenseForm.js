import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

//for
function ExpenseForm({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  const [input, setInput] = useState({
    //각 입력란에 대한 프로퍼티 (기존값이 있다면 기존값을 보여줌)
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  //입력정보 저장
  //inputIdentifier => amount, date, description
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInput((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //동적으로 프로퍼티 설정
      };
    });
  }

  //양식제출 함수(버튼클릭함수) => 입력값 받아서 유효성 검사
  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value, //+ => 문자열이 숫자로 변환
      date: new Date(input.date.value),
      description: input.description.value,
    };

    //유효성검사
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid Input", "다시 입력해 주세요");
      setInput((curInput) => {
        return {
          amount: { value: curInput.amount.value, isValid: amountIsValid },
          date: { value: curInput.date.value, isValid: dateIsValid },
          description: {
            value: curInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          invalid={!input.amount.isValid}
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            //값이 바뀔때 마다 함수 실행
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          invalid={!input.date.isValid}
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        invalid={!input.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          //autoCorrect: false, // 기본은 true
          //autoCapitalize: "none",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          잘못입력하셨습니다. 다시 확인해 주세요
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
