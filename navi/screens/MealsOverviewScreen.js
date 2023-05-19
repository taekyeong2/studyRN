//애니메이션이 실행되는 동안 부수 효과를 설정, 실행할때 사용
//(컴포넌트가 렌더링 되기 전에 부수효과 실행)
import { useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealList from "../componenets/MealList/MealList";

//메뉴 클릭시 식단 정보 화면(두번째 화면)
//route 프로퍼티는 Stack.Screen으로 설정된 컴포넌트에서만 얻을 수 있다.
function MealsOverviewScreen({ route, navigation }) {
  //route프로퍼티와 같은 역할 => Screen으로 등록되지 않은 중첩 컴포넌트에서 사용 가능
  //const route  = useRoute();
  //route.params
  const catId = route.params.categoryId; //해당 화면으로 이동할때 설정한 매개변수 객체

  //해당 아이디가 포함되어 있는 식단정보가 있는지 => boolean
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  //navigation의 setOptions를 사용하기 위해 useEffect사용
  //임포트 되지않고 함수 내부에서 사용하는 요소 => catId, navigation
  /*컴포넌트가 실행된 후 useEffect가 제목을 만들기 때문에 제목 뒤늦게 나타남 
    ==> 대신 useLayoutEffect를 사용하여 컴포넌트 함수 실행과 동시에 실행 */
  useLayoutEffect(() => {
    //catId에 맞는 카테고리 제목 가져오기
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealList items={displayedMeals} />;
}

export default MealsOverviewScreen;
