import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import FirstPage from "./screens/FirstScreen";
import SecondPage from "./screens/SecondScreen";
import ThirdPage from "./screens/ThirdPage";

import {
  AddButtonScreen,
  JournalScreen,
  MeasuresScreen,
  ProfileScreen,
  TreatmentScreen,
} from "./screens/BottonTab/Index";
import AddButton from "./components/AddButton";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    //만약 오류가 뜬다면 버전 오류 npm install react-native-reanimated@1 --save --save-exact 설치
    <NavigationContainer>
      {/* 탭 네비게이터 */}
      {/* <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#7b42aa" },
          headerTintColor: "white",
          tabBarActiveTintColor: "#7b42aa",
        }}
      >
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator> */}
      {/* 드로어 네비게이터 */}
      {/* <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#f4e6ff",
          drawerActiveTintColor: "#7b42aa",
          drawerStyle: { backgroundColor: "#fffef3" },
          headerStyle: { backgroundColor: "#7b42aa" },
          headerTintColor: "white",
          drawerPosition: "right",
          headerLeft: false,
          headerRight: () => <DrawerToggleButton />,
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: "Welcome Screen",
            groupName: "Section1",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            groupName: "Section2",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator> */}
      <BottomTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <BottomTab.Screen
          name="JournalScreen"
          component={JournalScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color="#CDCCCE" size={24} />
            ),
          }}
        />
        <BottomTab.Screen
          name="MeasuresScreen"
          component={MeasuresScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color="#CDCCCE" size={24} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Add"
          component={AddButtonScreen}
          options={{
            tabBarIcon: () => <AddButton />,
          }}
        />
        <BottomTab.Screen
          name="TreatmentScreen"
          component={TreatmentScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color="#CDCCCE" size={24} />
            ),
          }}
        />
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color="#CDCCCE" size={24} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
