import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import AnimatedBackground from '@components/AnimatedBackground';
import CsButton from '@components/CsButton';
import CsText from '@components/CsText';
import CsTextField from '@components/CsTextField';
import translate from '@helpers/localization';
import { navigationRef } from '@helpers/router';
import { showToast } from '@helpers/toast/showToast';
import { useTheme, useThemedStyles } from '@hooks/index';
import { useAuth } from '@hooks/useAuth';
import { isSignedInAtom } from '@modules/app/states/atoms';
import { spacing } from '@styles/spacing';
import { ITheme } from '@styles/theme';
import Routes from '@utils/Routes';

export default function Login() {
  const { login, loading, account } = useAuth();

  const navigation = useNavigation();
  const theme = useTheme();
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const setIsSignedIn = useSetAtom(isSignedInAtom);

  const [email, setEmail] = useState('ravengame762@gmail.com');
  const [password, setPassword] = useState('Aazzeerrtt88');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // TODO: Implement actual login logic
    const user = await login({ email, password });
    console.log('[USER]', user);
    console.log('[ACCOUNT]', account);
    showToast(translate('welcome'));
    setIsSignedIn(true);
  };

  const handleGoogleLogin = useCallback(() => {
    // TODO: Implement Google OAuth login
    showToast(translate('googleLoginNotImplemented'));
  }, [translate]);

  const handleForgotPassword = useCallback(() => {
    // TODO: Navigate to forgot password screen
    showToast(translate('forgotPasswordNotImplemented'));
  }, [translate]);

  const handleRegister = useCallback(() => {
    // TODO: Navigate to register screen
    navigationRef.navigate(Routes.Register);
  }, [navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <KeyboardAvoidingView
      style={themedStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <AnimatedBackground />
      <ScrollView contentContainerStyle={themedStyles.scrollContent}>
        <Animated.View entering={FadeInDown.duration(1000).springify()}>
          <CsText variant="h1" style={themedStyles.title}>
            {translate('welcomeBack')}
          </CsText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()}>
          <CsTextField
            label={translate('email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={24} color={theme.text} />}
            style={themedStyles.input}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()}>
          <CsTextField
            label={translate('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={24} color={theme.text} />}
            style={themedStyles.input}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(1000).springify()}>
          <TouchableOpacity onPress={handleForgotPassword} style={themedStyles.forgotPassword}>
            <CsText variant="caption">{translate('forgotPassword')}</CsText>
          </TouchableOpacity>

          <CsButton
            title={translate('login')}
            onPress={handleLogin}
            style={themedStyles.button}
            loading={loading}
          />

          <View style={themedStyles.divider}>
            <View style={themedStyles.dividerLine} />
            <CsText variant="caption" style={themedStyles.dividerText}>
              {translate('or')}
            </CsText>
            <View style={themedStyles.dividerLine} />
          </View>

          <CsButton
            title={translate('loginWithGoogle')}
            onPress={handleGoogleLogin}
            variant="secondary"
            icon={<Ionicons name="logo-google" size={24} color={theme.primary} />}
            style={themedStyles.button}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(600).duration(1000).springify()}
          style={themedStyles.registerContainer}
        >
          <CsText variant="body">{translate('dontHaveAccount')}</CsText>
          <TouchableOpacity onPress={handleRegister}>
            <CsText variant="body" style={themedStyles.registerText}>
              {' '}
              {translate('register')}
            </CsText>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: spacing.xl,
    },
    title: {
      marginBottom: spacing.xxl,
      textAlign: 'center',
    },
    input: {
      marginBottom: spacing.lg,
    },
    button: {
      marginVertical: spacing.md,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: spacing.md,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    dividerText: {
      marginHorizontal: spacing.md,
      color: theme.textLight,
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: spacing.xl,
    },
    registerText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
  });
