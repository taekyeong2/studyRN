import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-d54dc-default-rtdb.firebaseio.com";
//데이터 입력
export function storeExpense(expenseData) {
  //firebase에만 .json붙인다
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
}

//데이터 저장
//비동기로 호출하기때문에 프로미스 사용  ==> 이거 오류남/ fetch 사용법 알아와야할듯..
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
