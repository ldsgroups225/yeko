import { useState, useEffect, useRef, useCallback } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@utils/NotificationUtils";
import { SendNotificationParams } from "@helpers/pushNotification/types";

/**
 * Custom hook for managing push notifications in a React Native application.
 *
 * @returns An object containing the push notification state and a function to send notifications.
 */
export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(setExpoPushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener(setNotification);

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        // Handle notification response (e.g., navigate to a specific screen)
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  /**
   * Sends a push notification using the Expo push notification service.
   *
   * @param params - The parameters for the push notification.
   * @throws Will throw an error if the notification fails to send.
   */
  const sendPushNotification = useCallback(
    async (params: SendNotificationParams) => {
      const message = {
        to: params.to,
        sound: params.sound || "default",
        title: params.title,
        body: params.body,
        data: params.data || {},
      };

      try {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error("Error sending push notification:", error);
        throw error;
      }
    },
    [],
  );

  return { expoPushToken, notification, sendPushNotification };
};
