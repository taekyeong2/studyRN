import { NavigationContainer } from "@react-navigation/native";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";

//const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    //만약 오류가 뜬다면 버전 오류 npm install react-native-reanimated@1 --save --save-exact 설치
    <NavigationContainer>
      {/* 탭 네비게이터 */}
      <BottomTab.Navigator
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
      </BottomTab.Navigator>
      {/* 드로어 네비게이터 
        <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#f4e6ff",
          drawerActiveTintColor: "#7b42aa",
          drawerStyle: { backgroundColor: "#fffef3" },
          headerStyle: { backgroundColor: "#7b42aa" },
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: "Welcome Screen",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}
