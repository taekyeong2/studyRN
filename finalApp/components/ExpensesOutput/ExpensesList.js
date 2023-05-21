import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  // {... itemData.item} => 매개변수로 받는 프로퍼티 이름과
  //                        미가공된 데이터의 프로퍼티 이름이 같으면 전달 가능
  return <ExpenseItem {...itemData.item} />;
}

//지출목록
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
