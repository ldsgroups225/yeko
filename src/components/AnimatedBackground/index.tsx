import { useTheme } from '@hooks/index';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedBackground: React.FC = () => {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 10000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      [theme.background, theme.primary, theme.background]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        style={[styles.background, animatedStyle]}
        colors={[theme.background, theme.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
});

export default AnimatedBackground;
