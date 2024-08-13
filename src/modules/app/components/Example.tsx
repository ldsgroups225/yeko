import { useThemedStyles } from '@src/hooks';
import { ITheme } from '@styles/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Example = () => {
  const themedStyles = useThemedStyles<typeof styles>(styles);

  return (
    <View style={themedStyles.root}>
      <Text style={themedStyles.text}>example</Text>
    </View>
  );
};

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: {},

    text: {
      color: theme.secondary,
    },
  });

export default React.memo(Example);
