export default ({ config }) => ({
  ...config,
  name: "Yeko",
  description:
    "Yeko is an innovative mobile application designed for parents to effortlessly track their children's academic journey. With Yeko, stay informed about your child's academic progress, extracurricular activities, and important school events, all from your smartphone. Simplify communication with teachers and stay actively involved in your child's education, no matter where you are.",
  slug: "yeko",
  scheme: "io.ldsgroups.yeko",
  version: "1.0.0",
  // sdkVersion: '51.0.0',
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  // runtimeVersion: {
  //   policy: 'appVersion',
  // },
  // assetBundlePatterns: ['./src/assets/images/*'],
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
    supportsTablet: true,
    bundleIdentifier: "io.ldsgroups.yeko",
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
    package: "io.ldsgroups.yeko",
    versionCode: 1,
  },
  // updates: {
  //   enabled: true,
  //   url: 'https://u.expo.dev/fbb072ce-6da9-422f-a357-abd8ba0317f2',
  // },
  extra: {
    eas: {
      projectId: "fbb072ce-6da9-422f-a357-abd8ba0317f2",
    },
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          buildToolsVersion: "34.0.0",
        },
        ios: {
          deploymentTarget: "13.4",
        },
      },
    ],
  ],
});
