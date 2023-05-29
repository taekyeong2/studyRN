import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

//최근 비용 리스트 화면
function RecentExpenses() {
  //const expensesCtx = useContext(ExpensesContext);
  const [fetchExpenses, setFetchExpenses] = useState([]);

  //컴포넌트가 다시 렌더링 될때마다 실행
  useEffect(() => {
    //해당함수가 프로미스 반환하도록 실행(async await)
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setFetchExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpenses = fetchExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="최근 지출이 없습니다."
    />
  );
}

export default RecentExpenses;
