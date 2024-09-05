import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorBoundaryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oups!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
});

export default ErrorBoundaryPage;
