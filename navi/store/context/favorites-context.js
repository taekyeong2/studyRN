//favorites 콘텍스트 관리
import { createContext, useState } from "react";

//나중에 컴포넌트로 활용할거니까 대문자 시작
export const FavoritesContext = createContext({
  //자동완성을 위해
  //즐겨찾기 음식 id
  ids: [],
  //새로운 id를 추가할 함수
  addFavorite: (id) => {},
  //id 삭제
  removeFavorite: (id) => {},
});

//다른 파일에서 접근하기 위한 함수형 컴포넌트
function FavoritesContextProvider({ children }) {
  //관리중인 음식 id상태
  const [FavoriteMealIds, setFavoriteMealIds] = useState([]);

  //id 추가
  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }
  //id 삭제
  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  //다른 컴포넌트 내부에서 사용하기 위해
  const value = {
    ids: FavoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
