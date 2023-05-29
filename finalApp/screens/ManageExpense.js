import { View, StyleSheet, TextInput } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";
//비용관리 화면
function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  //지출 id가 있으면 수정, 없으면 추가모드
  const editExpenseId = route.params?.expenseId; //params? => params가 있으면,, if
  const isEditing = !!editExpenseId; //boolean값 반환

  //수정시 기존 지출내역 불러오기 위해
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  //컴포넌트가 실행되자마자 실행
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  //수정모드에서 삭제버튼 눌렀을때 함수핸들러
  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editExpenseId);
    //모달닫기(뒤로가기)
    navigation.goBack();
  }

  //취소버튼 눌렀을때 함수핸들러
  function cancelHandler() {
    //모달닫기(뒤로가기)
    navigation.goBack();
  }

  //수정/추가 핸들러
  function confiremHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editExpenseId, expenseData);
    } else {
      storeExpense(expenseData);
      expensesCtx.addExpense(expenseData);
    }
    //모달닫기(뒤로가기)
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confiremHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
