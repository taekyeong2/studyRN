import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import MealList from "../componenets/MealList/MealList";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";

//드로우 네비 화면
function FavoriteScreen() {
  const favoritMealsCtx = useContext(FavoritesContext);

  //즐겨찾기 된 음식 id배열에 포함되는 음식id가 있다면 true로 반환되어 배열로 생성
  const favoriteMeals = MEALS.filter((meal) =>
    favoritMealsCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealList items={favoriteMeals} />;
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
