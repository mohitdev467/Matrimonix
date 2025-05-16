import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { aboutUsScreenData } from "../../constants/CommonData/CommonData";

const AboutusScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.aboutUsText}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainWrapper}>
          <Image
            source={ImagePicker.aboutusScreenLogo}
            style={styles.imageWrapper}
          />

          <View style={styles.descriptionWrapper}>
            <Text style={styles.descText}>{aboutUsScreenData.description}</Text>
            <Text style={styles.descText}>
              {aboutUsScreenData.description2}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  mainWrapper: {
    marginHorizontal: Responsive.widthPx(7),
    marginBottom: Responsive.heightPx(4),
  },
  titleAndDateWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
  },

  titleText: {
    fontFamily: "Bold",
    fontSize: Responsive.font(8),
  },
  dateText: {
    color: "grey",
    fontSize: Responsive.font(4),
    fontFamily: "Regular",
  },

  imageWrapper: {
    height: Responsive.heightPx(40),
    width: Responsive.widthPx(90),
    alignSelf: "center",
    marginVertical: Responsive.heightPx(4),
    borderRadius: 25,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: pickColors.inputFieldBg,
  },

  descText: {
    fontSize: Responsive.font(4),
    fontFamily: "Regular",
    textAlign: "justify",
  },
});
