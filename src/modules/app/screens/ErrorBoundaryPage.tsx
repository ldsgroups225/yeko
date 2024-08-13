import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorBoundaryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hata!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {},
});

export default ErrorBoundaryPage;
