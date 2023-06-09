//https://www.youtube.com/watch?v=mGNvC4Ui7Dc

import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
function AddButton() {
  const buttonSize = useRef(new Animated.Value(1)).current;
  const mode = useRef(new Animated.Value(0)).current;
  function handlePress() {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -70],
  });
  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 20],
  });
  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={{ position: "absolute", left: thermometerX, top: thermometerY }}
      >
        <View style={styles.secondaryButton}>
          <Feather name="user" size={24} color={"#fff"} />
        </View>
      </Animated.View>
      <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
        <View style={styles.secondaryButton}>
          <Feather name="clock" size={24} color={"#fff"} />
        </View>
      </Animated.View>
      <TouchableHighlight
        style={styles.container}
        onPress={handlePress}
        underlayColor="#7F58FF"
      >
        <Animated.View
          style={[styles.button, { transform: [{ scale: buttonSize }] }]}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <FontAwesome5 name="plus" size={24} color="#FFF" />
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
    </View>
  );
}

export default AddButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7F58FF",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    position: "absolute",
    top: -60,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#7F58FF",
  },
});
