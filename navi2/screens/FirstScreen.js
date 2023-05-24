import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const FirstPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            React Navigation Drawer with Sectioned Menu & Footer
            {"\n\n"}
            This is the First Page
          </Text>
        </View>
        <Text style={styles.footerHeading}>
          React Navigation Drawer with Sectioned Menu
        </Text>
        <Text style={styles.footerText}>www.aboutreact.com</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },
});

export default FirstPage;
