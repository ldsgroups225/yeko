import { CardStyleInterpolators, StackNavigationOptions } from "@react-navigation/stack";
import { Dimensions, Platform } from "react-native";

/**
 * Options for configuring the screen behavior and appearance.
 */
export const ScreenOptions: StackNavigationOptions = {
    gestureEnabled: true,
    gestureResponseDistance: Dimensions.get('screen').width,
    headerShown: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#FFF',
        ...(Platform.OS === 'web' ? {
            boxShadow: 'none'
        } : {}),
    },
    headerTitleStyle: { fontFamily: 'Bold', },
    headerTitleAlign: 'center'
  };
