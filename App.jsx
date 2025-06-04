import React, { useEffect } from 'react';
import {
  LogBox,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { pickColors } from './src/helpers/theme/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import MainRoutes from './src/Router/MainRoutes';
import { requestUserPermission, getFCMToken, onMessageListener } from './src/Config/firebase';

function App() {
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const hasPermission = await requestUserPermission();
        if (hasPermission) {
          const token = await getFCMToken();
          console.log('FCM Token:', token);
          // Here you can send this token to your backend
        }
      } catch (error) {
        console.log('Error initializing Firebase:', error);
      }
    };

    initializeFirebase();

    // Listen for foreground messages
    const unsubscribe = onMessageListener().then(remoteMessage => {
      showMessage({
        message: remoteMessage.notification.title,
        description: remoteMessage.notification.body,
        type: "info",
        duration: 3000,
      });
    });

    return () => {
      unsubscribe;
    };
  }, []);

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
    flex: 1,
    backgroundColor: "white"
  },
});

export default App;
