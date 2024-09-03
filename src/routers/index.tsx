import translate from '@helpers/localization';
import HomeScreen from '@modules/app/screens/Home';
import Login from '@modules/app/screens/Login';
import EventScreen from '@modules/core/screens/eventScreen';
import HomeworkScreen from '@modules/core/screens/homeworkScreen';
import NoteScreen from '@modules/core/screens/noteScreen';
import PunctualityScreen from '@modules/core/screens/punctualityScreen';
import ScheduleScreen from '@modules/core/screens/scheduleScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@src/hooks';
import { useAppSelector } from '@src/store';
import Routes, { RootStackParams } from '@utils/Routes';
import { ScreenOptions } from '@utils/ScreenOptions';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { navigationRef } from '../helpers/router';
import DiscussionScreen from "@modules/core/screens/discussionScreen";
import ConversationDetailScreen from "@modules/core/screens/conversationDetailScreen";
import Registration from '@modules/app/screens/Register';
import { useAuth } from '@hooks/useAuth';

enableScreens();

const Stack = createStackNavigator<RootStackParams>();

function RootNavigation() {
    const { account } = useAuth()
  const isSignedIn = useAppSelector((s) => s.AppReducer?.isSignedIn) && account;
  const userColorScheme = useAppSelector((s) => s?.AppReducer?.userColorScheme);
  const theme = useTheme();
  const isDarkTheme = userColorScheme === 'dark';

  const navigationTheme = {
    dark: isDarkTheme,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.notification,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={isSignedIn ? Routes.Home : Routes.Login}
          screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
        >
          {isSignedIn ? (
            <>
              <Stack.Screen
                name={Routes.Home}
                component={HomeScreen}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                  headerTitle: translate('navigation.home'),
                }}
              />
              <Stack.Screen
                name={Routes.Punctuality}
                component={PunctualityScreen}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: 'transparent' },
                  title: 'Ponctualité',
                }}
              />
              <Stack.Screen
                name={Routes.Note}
                component={NoteScreen}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: 'transparent' },
                  title: 'Notes et moyennes',
                }}
              />
              <Stack.Screen
                name={Routes.Schedule}
                component={ScheduleScreen}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: 'transparent' },
                  title: 'Emploi du temps',
                }}
              />
              <Stack.Screen
                name={Routes.Homework}
                component={HomeworkScreen}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: 'transparent' },
                  title: 'Devoirs de maison',
                }}
              />
              <Stack.Screen
                  name={Routes.Discussion}
                  component={DiscussionScreen}
                  options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: 'transparent' },
                    title: 'Discussion',
                  }}
              />
              <Stack.Screen
                  name={Routes.Info}
                  component={EventScreen}
                  options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: 'transparent' },
                    title: 'Info et scolarité',
                  }}
              />
              <Stack.Screen
                  name={Routes.ConversationDetail}
                  component={ConversationDetailScreen}
                  options={{
                    headerShown: false
                  }}
              />
            </>
          ) : (
            <>
            <Stack.Screen
              name={Routes.Login}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.Register}
              component={Registration}
              options={{ headerShown: false }}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation;
