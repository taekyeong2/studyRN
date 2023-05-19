import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useLayoutEffect, useContext } from "react";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";
import MealDetails from "../componenets/MealDetails";
import Subtitle from "../componenets/MealDetail/Subtitle";
import List from "../componenets/MealDetail/List";
import IconButton from "../componenets/IconButton";

//식단 상세화면
function MealDetailScreen({ route, navigation }) {
  //useContext => 콘텍스트를 정의하고 사용하는 기능
  const favoriteMealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;

  //해당하는 식단 정보
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  //식단이 즐겨찾기 상태인지 체크(boolean)
  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  //헤더 버튼 클릭시 => 음식으 실제 즐겨찾기 상태가 변경
  function changeFavoritesStatusHandler() {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  //헤더에 버튼삽입
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoritesStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoritesStatusHandler]); //heaner..PressHandler도 바깥쪽에 정의되어 있으니 의존성 등록

  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
