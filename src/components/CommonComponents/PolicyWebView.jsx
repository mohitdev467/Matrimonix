import React from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { pickColors } from '../../helpers/theme/colors';
import Responsive from '../../helpers/ResponsiveDimensions/Responsive';
import HeaderWithSearchBack from './HeaderWithBack';
import { commonUtils } from '../../utilities/CommonUtils/CommonUtils';

const PolicyWebView = ({ uri, screen }) => {

  const screenTitle = {
    'term&condition': commonUtils.termsAndConditionsText,
    'refund': commonUtils.refundText,
    'privacy': commonUtils.privacyPolicyText,
  }
  return (
    <SafeAreaView style={[styles.container]}>
        <HeaderWithSearchBack
        headerTitle= {screenTitle[screen] || commonUtils.privacyPolicyText}
        isBackHeader={true}
        icon={"arrow-left"}
      />
      <WebView
        source={{ uri }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={pickColors.brandColor} />
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
    marginTop: Responsive.heightPx(2),
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pickColors.whiteColor,
  },
});

export default PolicyWebView; 