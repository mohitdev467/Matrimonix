
import React from 'react';
import {
  StatusBar,
  StyleSheet,

  View,
} from 'react-native';
import { pickColors } from './src/helpers/theme/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import MainRoutes from './src/Router/MainRoutes';

function App(){
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
