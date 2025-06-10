import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification Permission Granted:', authStatus);
      await getFCMToken();
    } else {
      console.log('Notification Permission Denied:', authStatus);
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
}

export async function getFCMToken() {
  try {
    const existingToken = await AsyncStorage.getItem('fcmToken');

    if (existingToken) {
      console.log('FCM Token from AsyncStorage:', existingToken);
      return;
    }

    const newToken = await messaging().getToken();
    if (newToken) {
      await AsyncStorage.setItem('fcmToken', newToken);
      console.log('New FCM Token Stored:', newToken);

    } else {
      console.warn('Failed to get FCM Token');
    }
  } catch (error) {
    console.error('Error retrieving/storing FCM token:', error);
  }
}

export const notificationListener = async () => {
  try {
    console.log('hello');
    messaging().onMessage(async remoteMessage => {
      Alert.alert("remoteMessage");
      console.log('Notification received in foreground:', remoteMessage);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      Alert.alert("remoteMessage");
      console.log('Notification opened from background:', remoteMessage);
    });

    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log('App opened from quit state by notification:');
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background:', remoteMessage);
    });
  } catch (error) {
    console.error('Error in notification listener:', error);
  }
};
