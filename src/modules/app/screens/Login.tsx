import CsButton from '@components/CsButton';
import { showToast } from '@helpers/toast/showToast';
import { isSignedInAtom, userAtom } from '@modules/app/states/atoms';
import { useSetAtom } from 'jotai';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const setUser = useSetAtom(userAtom);
  const setIsSignedIn = useSetAtom(isSignedInAtom);

  const goHomePage = useCallback(() => {
    showToast('Welcome');
    setUser({ name: 'Darius KASSI' });
    setIsSignedIn(true);
  }, [setUser, setIsSignedIn]);

  return (
    <View style={styles.root}>
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <CsButton title="Login" onPress={goHomePage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontFamily: 'Bold',
    fontSize: 25,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
