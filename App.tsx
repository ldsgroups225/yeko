import React, { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { Provider } from "jotai";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";
import RootNavigation from "./src/routers";
import CustomProvider from "./src/providers";
import ErrorBoundary from "./src/providers/ErrorBoundary";

enableScreens();

function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch(error =>
        console.error("Failed to lock screen orientation:", error)
      );
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider>
        <CustomProvider>
          <RootNavigation />
        </CustomProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
