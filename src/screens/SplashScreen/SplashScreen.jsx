import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";

const SplashScreen = () => {
  return (
    <SafeAreaView style={Styles.splashScreenContainer}>
      <ImageBackground
        source={ImagePicker.splashScreenImage5}
        style={Styles.splashImage}
        resizeMode="cover"
      ></ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: pickColors.whiteColor,
  },

  splashImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
