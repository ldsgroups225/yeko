import CsText from '@components/CsText';
import { useThemedStyles } from '@hooks/index';
import { spacing } from '@styles/spacing';
import { ITheme } from '@styles/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PasswordStrengthIndicatorProps {
  strength: number;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const themedStyles = useThemedStyles<typeof styles>(styles);

  const getStrengthText = (strength: number): string => {
    switch (strength) {
      case 0:
        return 'Weak';
      case 1:
        return 'Fair';
      case 2:
        return 'Good';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  const getStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
        return themedStyles.weak.backgroundColor;
      case 1:
        return themedStyles.fair.backgroundColor;
      case 2:
        return themedStyles.good.backgroundColor;
      case 3:
        return themedStyles.strong.backgroundColor;
      case 4:
        return themedStyles.veryStrong.backgroundColor;
      default:
        return themedStyles.weak.backgroundColor;
    }
  };

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.barContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              themedStyles.strengthBar,
              {
                backgroundColor:
                  index < strength
                    ? getStrengthColor(strength)
                    : themedStyles.inactiveBar.backgroundColor,
              },
            ]}
          />
        ))}
      </View>
      <CsText variant="caption" style={themedStyles.strengthText}>
        {getStrengthText(strength)}
      </CsText>
    </View>
  );
};

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    barContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    strengthBar: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 2,
    },
    inactiveBar: {
      backgroundColor: theme.border,
    },
    strengthText: {
      textAlign: 'center',
    },
    weak: {
      backgroundColor: theme.error,
    },
    fair: {
      backgroundColor: theme.warning,
    },
    good: {
      backgroundColor: theme.success,
    },
    strong: {
      backgroundColor: theme.primary,
    },
    veryStrong: {
      backgroundColor: theme.primary,
    },
  });

export default PasswordStrengthIndicator;
