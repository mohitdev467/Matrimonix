import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { TextBold, TextSemiBold } from "../CommonComponents/CustomText";

const HomeScreenCardComponent = ({ statsData }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.wrapper, { backgroundColor: "#d1204d" }]}
        onPress={() => navigation.navigate(screenNames.ShortlistedScreen)}
      >
        <TextBold style={styles.countStyle}>{statsData.shortlistedCount}</TextBold>
        <TextSemiBold style={styles.titleStyle}>{commonUtils.shortlistedBYme}</TextSemiBold>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.wrapper, { backgroundColor: "#cca600" }]} onPress={() => navigation.navigate(screenNames.NewsScreen)}>
        <TextBold style={styles.countStyle}>{statsData.newsCount || 0}</TextBold>
        <TextSemiBold style={styles.titleStyle}>{commonUtils.totalNews}</TextSemiBold>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.wrapper, { backgroundColor: "#759619" }]}         
      onPress={() => navigation.navigate(screenNames.ServieProviderScreen)}
      >
        <TextBold style={styles.countStyle}>{statsData.serviceProvidersCount}</TextBold>
        <TextSemiBold style={styles.titleStyle}>{commonUtils.totalServices}</TextSemiBold>
      </TouchableOpacity>

      <View></View>
    </View>
  );
};

export default HomeScreenCardComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: Responsive.heightPx(4),
    marginHorizontal: Responsive.widthPx(4),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    height: Responsive.heightPx(14),
    width: Responsive.widthPx(28),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    paddingHorizontal: Responsive.widthPx(3),
    borderRadius: 10,
  },
  countStyle: {
    fontSize: Responsive.font(6),
    fontFamily:"Ubuntu-Medium",
    color: pickColors.whiteColor,
  },
  titleStyle: {
    fontSize: Responsive.font(3),
    fontFamily:"Ubuntu-Medium",
    color: pickColors.whiteColor,
    textAlign: "center",
  },
});
