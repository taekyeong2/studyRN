import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

//최근 비용 리스트 화면
function RecentExpenses() {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
}

export default RecentExpenses;
