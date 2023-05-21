import { createSlice } from "@reduxjs/toolkit";

//redux slice 생성 => 상태와 데이터, 데이터를 변경할수 있는 동작 정의
const favoriteSlice = createSlice({
  name: "favorites",
  //초기상태
  initialState: {
    ids: [],
  },
  //상태를 변경할때 사용하는 함수
  //리듀서로 정의하는 모든 메서드는 자동으로 최신상태를 입력값으로 가져옴(state)
  reducers: {
    addFavorite: (state, action) => {
      //action.payload => 이 함수에 추가될 수 있는 데이터를
      //                   payload프로퍼티를 사용해 전송
      //payload에서 id를 얻은 후 이 id를 배열에 push
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      //제거할 id의 인덱스로 splice해서 삭제
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

//내보내기
//앱 다른 위치에서 메소드 호출 위해 내보내기
export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
//나중에 store에 병합해야 하니까 내보내기
export default favoriteSlice.reducer;
