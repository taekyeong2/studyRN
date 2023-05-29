//지출상태관리 콘텍스트
import { createContext, useReducer } from "react";
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
    date: new Date("2023-05-29"),
  },
  {
    id: "e8",
    description: "바나나 하나",
    amount: 5000,
    date: new Date("2023-05-27"),
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

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

//리듀서 함수 => 항상 새 상태값 반환
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD": //기존배열에 새 배열 추가
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      //업데이트 해야할 인덱스(????이부분 어려움)
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      //아이디는 유지한채 기존값 덮어쓰기
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  //상태관리
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
