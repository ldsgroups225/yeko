import * as Notifications from "expo-notifications";

/**
 * Represents the state of push notifications in the application.
 */
export interface PushNotificationState {
  /** The Expo push token for the device. */
  expoPushToken?: Notifications.ExpoPushToken;
  /** The most recent notification received. */
  notification?: Notifications.Notification;
}

/**
 * Parameters for sending a push notification.
 */
export interface SendNotificationParams {
  /** The recipient's Expo push token. */
  to: string;
  /** The title of the notification. */
  title: string;
  /** The body content of the notification. */
  body: string;
  /** Additional data to be sent with the notification. */
  data?: Record<string, unknown>;
  /** The sound to play when the notification is received. */
  sound?: string;
}
