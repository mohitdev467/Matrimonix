
import React, { useEffect, useState } from 'react';
import {
  Alert,
  LogBox,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { pickColors } from './src/helpers/theme/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import MainRoutes from './src/Router/MainRoutes';
import { getFCMToken, notificationListener, requestUserPermission } from './src/Config/firebase';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
LogBox.ignoreAllLogs();
function App(){
  
    useEffect(() => {
    requestPermissionAndroid();
  }, []);
 
  const requestPermissionAndroid  = async () => {
    const granted = await  PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    console.log("Notification permission granted:", granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getToken();
    } else {
      Alert.alert("Notification permission denied");
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  const getToken = async ()=>{
    const token = await messaging().getToken();
    console.log("token ",token)
  }

  const onDisplayNotification = async (remoteMessage) => {
    console.log("Remote Message:", remoteMessage);
        const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: remoteMessage.notification.title || 'Default Title',
      body: remoteMessage.notification.body || 'Default Body',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={pickColors.brandColor}
      />          

      <GestureHandlerRootView>
        <MainRoutes />
        <FlashMessage position="top" />
      </GestureHandlerRootView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    backgroundColor:"white"
  },
  
});

export default App;
