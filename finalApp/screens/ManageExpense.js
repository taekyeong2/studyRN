import { View, StyleSheet, TextInput } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
//비용관리 화면
function ManageExpense({ route, navigation }) {
  //처음에는 데이터를 보내지 않으니 false
  const [isSubmitting, setIsSubmitting] = useState(false);
  //에러상태
  const [error, setError] = useState();

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
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editExpenseId);
      //setIsSubmitting(false) => 모달창이 닫히므로 불필요
      expensesCtx.deleteExpense(editExpenseId);
      //모달닫기(뒤로가기)
      navigation.goBack();
    } catch (error) {
      setError("지출을 삭제할 수 없습니다.");
      setIsSubmitting(false); //에러 발생시 모달창이 닫히지않으므로 필요
    }
  }

  //취소버튼 눌렀을때 함수핸들러
  function cancelHandler() {
    //모달닫기(뒤로가기)
    navigation.goBack();
  }

  //수정/추가 핸들러
  async function confiremHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editExpenseId, expenseData);
        await updateExpense(editExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      //모달닫기(뒤로가기)
      navigation.goBack();
    } catch (error) {
      setError("지출을 등록할 수 없습니다.");
      setIsSubmitting(false);
    }
  }

  //에러화면
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  //isSubmitting 으로 로딩화면
  if (isSubmitting) {
    return <LoadingOverlay />;
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
