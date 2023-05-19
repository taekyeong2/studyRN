import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";

//음식 리스트
function MealList({ items }) {
  //FlatList renderItem 안의 함수
  function renderMealItem(itemData) {
    const item = itemData.item;
    //식단 내용
    const mealItemProps = {
      id: item.id,
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
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
