import CsButton from '@components/CsButton';
import CsCard from '@components/CsCard';
import CsListTile from '@components/CsListTile';
import CsText from '@components/CsText';
import CsTextField from '@components/CsTextField';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useThemedStyles } from '@hooks/index';
import { spacing } from '@styles/index';
import { ITheme } from '@styles/theme';
import React, { useState } from 'react';
import { FlatList, OpaqueColorValue, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const components = [
  {
    key: 'headline1',
    element: () => <CsText variant="h1">Heading 1</CsText>,
  },
  {
    key: 'headline2',
    element: () => <CsText variant="h2">Headline 2</CsText>,
  },
  {
    key: 'headline3',
    element: () => <CsText variant="h3">Headline 3</CsText>,
  },
  {
    key: 'body',
    element: () => <CsText variant="body">Body</CsText>,
  },
  {
    key: 'caption',
    element: () => <CsText variant="caption">Caption</CsText>,
  },
  {
    key: 'overline',
    element: () => <CsText variant="overline">Overline</CsText>,
  },
  {
    key: 'emailTextField',
    element: (
      theme: { text: string | OpaqueColorValue | undefined },
      state: { email: string },
      setState: { email: (text: string) => void }
    ) => (
      <CsTextField
        label="Email"
        value={state.email}
        onChangeText={setState.email}
        placeholder="Enter your email"
        leftIcon={<Ionicons name="mail" size={20} color={theme.text} />}
      />
    ),
  },
  {
    key: 'passwordTextField',
    element: (
      theme: { text: string | OpaqueColorValue | undefined },
      state: { password: string },
      setState: { password: (text: string) => void }
    ) => (
      <CsTextField
        label="Password"
        value={state.password}
        onChangeText={setState.password}
        placeholder="Enter your password"
        returnKeyType="default"
        secureTextEntry
        leftIcon={<Ionicons name="lock-closed" size={20} color={theme.text} />}
      />
    ),
  },
  {
    key: 'defaultPrimaryButton',
    element: () => (
      <CsButton
        title="Default | Primary"
        onPress={() => console.info('Default | Primary button pressed')}
      />
    ),
  },
  {
    key: 'secondaryButton',
    element: () => (
      <CsButton
        title="Secondary"
        variant="secondary"
        onPress={() => console.info('Secondary button pressed')}
      />
    ),
  },
  {
    key: 'textButton',
    element: () => (
      <CsButton title="Text" variant="text" onPress={() => console.info('Text button pressed')} />
    ),
  },
  {
    key: 'largeButton',
    element: () => (
      <CsButton
        title="Large Button"
        size="large"
        onPress={() => console.info('Large Button pressed')}
      />
    ),
  },
  {
    key: 'mediumButton',
    element: () => (
      <CsButton
        title="Medium Button"
        size="medium"
        onPress={() => console.info('Medium Button pressed')}
      />
    ),
  },
  {
    key: 'smallButton',
    element: () => (
      <CsButton
        title="Small Button"
        size="small"
        onPress={() => console.info('Small Button pressed')}
      />
    ),
  },
  {
    key: 'simpleListTile',
    element: () => <CsListTile title="Simple List Item" subtitle="This is a subtitle" />,
  },
  {
    key: 'listTileWithIcon',
    element: (theme: ITheme) => (
      <CsListTile
        title="List Item with Icon"
        subtitle="This has leading and trailing icons"
        leading={<Ionicons name="person" size={24} color={theme.primary} />}
        trailing={<Ionicons name="chevron-forward" size={24} color={theme.textLight} />}
        onPress={() => console.log('List item pressed')}
      />
    ),
  },
  {
    key: 'denseListTile',
    element: () => (
      <CsListTile title="Dense List Item" subtitle="This is a compact list item" dense={true} />
    ),
  },
  {
    key: 'customStyledListTile',
    element: (theme: ITheme) => (
      <CsListTile
        title="Custom Styled"
        subtitle="This list item has custom styles"
        style={{ backgroundColor: theme.secondary, borderRadius: 8 }}
        titleStyle={{ color: theme.background, fontWeight: 'bold' }}
        subtitleStyle={{ color: theme.background }}
        leading={<Ionicons name="star" size={24} color={theme.background} />}
        onPress={() => console.log('Custom styled list item pressed')}
      />
    ),
  },
  {
    key: 'exampleCard',
    element: (theme: ITheme) => (
      <CsCard
        title="Example Card"
        content="This is an example of the CsCard component. It can contain a title, content, and a footer."
        footer={
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CsButton
              title="Action"
              variant="text"
              size="small"
              onPress={() => console.log('Card action pressed')}
            />
          </View>
        }
        onPress={() => console.log('Card pressed')}
        style={{ backgroundColor: theme.card }}
        titleStyle={{ color: theme.primary }}
        contentStyle={{ color: theme.text }}
      />
    ),
  },
];

function ComponentVisualTestingScreen() {
  const theme = useTheme();
  const themedStyles = useThemedStyles<typeof styles>(styles);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const state = { email, password };
  const setState = { email: setEmail, password: setPassword };

  return (
    <View style={themedStyles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themedStyles.container.backgroundColor}
      />
      <SafeAreaView edges={['right', 'left']} style={themedStyles.safeView}>
        <FlatList
          data={components}
          renderItem={({ item }) => item.element(theme, state, setState)}
          keyExtractor={(item) => item.key}
          contentContainerStyle={themedStyles.listContent}
          ItemSeparatorComponent={() => <View style={themedStyles.separator} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: spacing.sm,
    },
    safeView: {
      flex: 1,
    },
    listContent: {
      paddingVertical: spacing.md,
    },
    separator: {
      height: spacing.md,
    },
  });

export default ComponentVisualTestingScreen;
