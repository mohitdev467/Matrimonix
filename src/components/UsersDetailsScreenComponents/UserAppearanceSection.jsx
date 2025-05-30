import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserAppearanceSection = ({ myDetails }) => {
  return (
    <View>
      <View style={styles.mainWrapper}>
        <View style={styles.widthPx40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Height :
          </Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.height
              ? `${myDetails?.height}`
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.widthPx40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Weight :
          </Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.weight
              ? `${myDetails?.weight}KG`
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.widthPx40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Blood Group:
          </Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.blood_group
              ? myDetails?.blood_group
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.widthPx40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Special Case :
          </Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
                width: Responsive.widthPx(50),
              },
            ]}
          >
            {myDetails?.challenged
              ? myDetails?.challenged
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
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
