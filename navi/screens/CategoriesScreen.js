import { CATEGORIES } from "../data/dummy-data";
//고정된 목록에서는 FlatList가 사실 필요하지 않다.
import { FlatList } from "react-native";
import CategoryGridTile from "../componenets/CategoryGridTIle";

//카테고리 화면
//navigation 프로퍼티는 Stack.Screen으로 설정된 컴포넌트에서만 얻을 수 있다.
function CategoriesScreen({ navigation }) {
  //flaList의 renderItem의 헬퍼함수 (선택사항)
  function renderCategoryItem(itemData) {
    //버튼 클릭시 화면호출 함수(네비게이션사용)
    function pressHandler() {
      //navigation.navigate("이동하고자하는 화면 name", {객체} )
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      //(screen으로 설정되지 않은) 중첩된 컴포넌트에 navigation 객체 전달 위해 => useNavigation훅사용
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <FlatList
      //Changing numColumns on the fly is not supported 오류로 key 추가
      key={(itme) => item.id}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2} //FlatList에 2개의 열로 렌더링
    />
  );
}

export default CategoriesScreen;
