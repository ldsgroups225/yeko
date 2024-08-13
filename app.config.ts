import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Yeko",
  description: "Yeko is a mobile application that help student parents to keep track their children scolar live.",
  slug: "yeko",
  scheme: "io.ldsgroup.yeko",
  version: "1.0.0",
  sdkVersion: "51.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["./src/assets/images/*"],
  locales: {
    tr: "./src/assets/languages/turkish.json",
    en: "./src/assets/languages/english.json",
  },
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "io.ldsgroup.yeko",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "io.ldsgroup.yeko",
    versionCode: 1,
  },
  updates: {
    enabled: true,
    url: "https://u.expo.dev/fbb072ce-6da9-422f-a357-abd8ba0317f2",
  },
  extra: {
    eas: {
      projectId: "fbb072ce-6da9-422f-a357-abd8ba0317f2",
    },
  },
});
