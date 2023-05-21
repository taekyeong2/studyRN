import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favorites";

export const store = configureStore({
  /*reducer => redux가 사용하는 모든 데이터와 동작을 저장 */
  reducer: {
    favoriteMeals: favoritesReducer,
  },
});
