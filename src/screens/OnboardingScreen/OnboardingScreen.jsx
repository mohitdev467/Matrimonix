import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { pickColors } from "../../helpers/theme/colors";
import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const data = [
    {
      image: ImagePicker.intro1,
    },
    {
      image: ImagePicker.intro2,
    },
    {
      image: ImagePicker.intro3,
    },
  ];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate(screenNames.LoginScreen);
    }
  };

  const renderSlide = (item) => (
    <ImageBackground
      source={item.image}
      style={styles.slideBackground}
      resizeMode="cover"
    >
      <View style={styles.onboardingContentWrapper}>
        <ButtonComponent
          title={
            currentIndex === 2 ? commonUtils.getStarted : commonUtils.nextText
          }
          onPress={handleNext}
          style={styles.corouselButton}
        />
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>{renderSlide(data[currentIndex])}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.blackColor,
  },
  slideBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:pickColors.brandColor,
  },
  onboardingContentWrapper: {
    position: "absolute",
    bottom: 50,
    paddingHorizontal: Responsive.widthPx(6),
    alignSelf: "center",
  },

  onboardingTitle: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(12),
    fontFamily: "Bold",
    textAlign: "center",
  },

  textWrapper: {
    paddingBottom: Responsive.heightPx(7),
  },

  onboardingSubTitle: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(5),
    fontFamily: "Regular",
    textAlign: "center",
  },

  corouselButton: {
    width: Responsive.widthPx(100),
    borderRadius: 0,
    bottom: 0,
    alignSelf: "center",
    position: "absolute",
  },
});

export default OnboardingScreen;
