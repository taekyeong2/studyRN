import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import FavoritesContextProvider from "./store/context/favorites-context";

//스택 네비게이터
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//드로어 네비게이터 설정
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#422300" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#42382e" },
        drawerContentStyle: { backgroundColor: "#422300" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#422300",
        drawerActiveBackgroundColor: "#ffefde",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#422300" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#42382e" },
            }}
          >
            {/* Stack.Screen => 네이게이터가 관리할 화면 등록 
          name => 고유한 식별자, 화면간 이동 시 중요한 역할
          componene => 해당 화면을 제공 */}
            <Stack.Screen
              name="Drawer"
              //CategoriesScreen위치에 드로우네비 함수(중첩)
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   //oprion 객체가 반환되어야 한다.
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{
                title: "About the Meal",
              }}
              // options={{
              //   headerRight: () => {
              //     return <Button title="Tap me!" />;
              //   },
              // }}   ==> 이 방법은 화면 콘텐츠를 렌더링 하는 컴포넌트와 직접 연결할 필요 없을때 사용
              //          직접 연결이 필요하다면 화면 컴포넌트에서 import해줘야함(MealDetailScreen 으로~~!)
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
