import { View, StyleSheet, FlatList, Text } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useRoute } from "@react-navigation/native";
import MealItem from "../componenets/MealItem";

//메뉴 클릭시 식단 정보 화면(두번째 화면)
//route 프로퍼티는 Stack.Screen으로 설정된 컴포넌트에서만 얻을 수 있다.
function MealsOverviewScreen({ route }) {
  //route프로퍼티와 같은 역할 => Screen으로 등록되지 않은 중첩 컴포넌트에서 사용 가능
  //const route  = useRoute();
  //route.params
  const catId = route.params.categoryId; //해당 화면으로 이동할때 설정한 매개변수 객체

  //해당 아이디가 포함되어 있는 식단정보가 있는지 => boolean
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  //FlatList renderItem 안의 함수
  function renderMealItem(itemData) {
    const item = itemData.item;
    //식단 내용
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
