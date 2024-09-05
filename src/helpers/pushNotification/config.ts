import * as Notifications from "expo-notifications";

/**
 * Sets the global notification handler for the application.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
