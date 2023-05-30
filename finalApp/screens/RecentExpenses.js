import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

//최근 비용 리스트 화면
function RecentExpenses() {
  //이 컴포넌트에서 현재 데이터를 로딩하고 있는지 확인(로딩화면 위해)
  const [isFetching, setIsFetching] = useState(true);
  //에러상태
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  //컴포넌트가 다시 렌더링 될때마다 실행
  useEffect(() => {
    //해당함수가 프로미스 반환하도록 실행(async await)
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses(); //데이터 가져오기
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("지출정보를 불러올 수 없습니다.");
      }
      setIsFetching(false); //데이터 다 가져온 후 false
    }

    getExpenses();
  }, []);

  //isFetching을 통해 로딩화면
  if (isFetching) {
    return <LoadingOverlay />;
  }

  //에러발생시 함수
  function errorHandler() {
    setError(null);
  }

  //에러화면
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
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
