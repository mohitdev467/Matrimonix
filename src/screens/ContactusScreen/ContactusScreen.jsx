import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { contactusScreenData } from "../../constants/CommonData/CommonData";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.contactUstext}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={ImagePicker.loginScreenLogo}
          style={styles.imageWrapper}
          tintColor={pickColors.brandColor}
        />

        <View style={styles.innerWrapper}>
          <Text style={styles.getinTouchHeadingStyle}>
            {contactusScreenData.getIntouchHeading}
          </Text>
          <View>
            <Text style={styles.subtitleStyle}>
              {contactusScreenData.subtitle}
            </Text>
            <Text style={styles.subtitleStyle}>
              {contactusScreenData.subTitle2}
            </Text>
          </View>
        </View>

        <View style={styles.contactContainer}>
          <View style={styles.contactWrapper}>
            <Icon
              name="phone"
              color={pickColors.blackColor}
              size={Responsive.font(6)}
            />
            <Text style={styles.textStyle}>
              {contactusScreenData.mobileNumber}
            </Text>
          </View>
          <View style={styles.contactWrapper}>
            <Icon
              name="mail"
              color={pickColors.blackColor}
              size={Responsive.font(6)}
            />
            <Text style={styles.textStyle}>{contactusScreenData.email}</Text>
          </View>
          <View style={styles.contactWrapper}>
            <Icon
              name="map-pin"
              color={pickColors.blackColor}
              size={Responsive.font(6)}
            />
            <Text style={styles.textStyle}>{contactusScreenData.address}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  innerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  getinTouchHeadingStyle: {
    fontFamily: "Ubuntu-Bold",
    fontSize: Responsive.font(6.5),
    marginBottom: Responsive.heightPx(1.2),
    color: pickColors.blackColor,
  },
  subtitleStyle: {
    fontFamily: "Ubuntu-Medium",
    fontSize: Responsive.font(3.7),
  },

  contactContainer: {
    marginTop: Responsive.heightPx(2),
  },

  contactWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(4),
    borderWidth: 1,
    borderRadius: 100,
    marginHorizontal: Responsive.widthPx(5),
    paddingHorizontal: Responsive.widthPx(6),
    paddingVertical: Responsive.heightPx(2.5),
    marginTop: Responsive.heightPx(4),
  },
  textStyle: {
    fontFamily: "Ubuntu-Regular",
    fontSize: Responsive.font(4),
    width:Responsive.widthPx(70)
  },

  imageWrapper: {
    height: Responsive.heightPx(15),
    width: Responsive.widthPx(30),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Responsive.heightPx(4),
  },
});
