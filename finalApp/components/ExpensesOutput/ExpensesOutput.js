import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

//지출더미
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "신발 한 켤레",
    amount: 89000,
    date: new Date("2023-05-19"),
  },
  {
    id: "e2",
    description: "바지 한 개",
    amount: 56000,
    date: new Date("2023-04-29"),
  },
  {
    id: "e3",
    description: "바나나 하나",
    amount: 5000,
    date: new Date("2023-05-03"),
  },
  {
    id: "e4",
    description: "책 세 권",
    amount: 60000,
    date: new Date("2023-03-09"),
  },
  {
    id: "e5",
    description: "책 한권",
    amount: 13000,
    date: new Date("2023-03-10"),
  },
  {
    id: "e6",
    description: "신발 한 켤레",
    amount: 89000,
    date: new Date("2023-05-19"),
  },
  {
    id: "e7",
    description: "바지 한 개",
    amount: 56000,
    date: new Date("2023-04-29"),
  },
  {
    id: "e8",
    description: "바나나 하나",
    amount: 5000,
    date: new Date("2023-05-03"),
  },
  {
    id: "e9",
    description: "책 세 권",
    amount: 60000,
    date: new Date("2023-03-09"),
  },
  {
    id: "e10",
    description: "책 한권",
    amount: 13000,
    date: new Date("2023-03-10"),
  },
];

//지출목록와 요약 (AllExpenses, RecentExpenses)
function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
