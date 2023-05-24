import { Text } from "react-native";
import { useLayoutEffect } from "react";

//비용관리 화면
function ManageExpense({ route, navigation }) {
  //지출 id가 있으면 수정, 없으면 추가모드
  const editExpenseId = route.params?.expenseId; //params? => params가 있으면,, if
  const isEditing = !!editExpenseId; //boolean값 반환

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
