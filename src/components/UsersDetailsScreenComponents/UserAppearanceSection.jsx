import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserAppearanceSection = ({ myDetails }) => {
  return (
    <View style={{flexDirection:"column", gap:Responsive.heightPx(1.5)}}>
      
    </View>
  );
};

export default UserAppearanceSection;

const styles = StyleSheet.create({
  newTextStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4),
    marginVertical: Responsive.heightPx(0.3),
    width: Responsive.widthPx(50),
    fontFamily:"Ubuntu-Medium",
  },

  mainWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  widthPx40: {
    width: Responsive.widthPx(40),
  },
  innerWrapper: {
    alignSelf: "flex-start",
    width: Responsive.widthPx(60),
  },
});
