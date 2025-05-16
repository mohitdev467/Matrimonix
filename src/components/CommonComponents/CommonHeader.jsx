import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { TextBold } from "./CustomText";

const CommonHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.HomeScreen)}
      >
        <View style={styles.logoWrapper}>
          <Image source={ImagePicker.logoImage} style={styles.logoImage} />

          <TextBold style={styles.logoTextStyle}>MATRIMONIX</TextBold>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.NotificationScreen)}
      >
        <Icon name="bell" style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(0.2),
    paddingHorizontal: Responsive.widthPx(3),
  },
  logoWrapper: {
    height: Responsive.heightPx(7),
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1),
  },

  logoImage: {
    height: Responsive.heightPx(5),
    width: Responsive.widthPx(10),
  },
  logoTextStyle: {
    color: pickColors.brandColor,
    fontFamily: "Ubuntu-Bold",
    fontSize: Responsive.font(4.5),
    
  },
  notificationIcon: {
    fontSize: Responsive.font(6.5),
    color: pickColors.brandColor,
  },
});
