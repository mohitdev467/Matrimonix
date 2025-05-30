import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserOverviewSection = ({ myDetails }) => {
  return (
    <View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Gotra (Family) :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.gotra ? myDetails?.gotra : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Gotra (Nanihal) :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.gotra_nanihal
              ? myDetails?.gotra_nanihal
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Annual Income :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.income ? myDetails?.income : commonUtils.notAvailable}
          </Text>
        </View>
      </View>

      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Address :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.address ? myDetails?.address : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            City :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.city ? myDetails?.city : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            District :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.district
              ? myDetails?.district
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            State :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.state ? myDetails.state : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.gotraWrapper}>
        <View style={styles.width40}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Aadhar Number :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
              },
            ]}
          >
            {myDetails?.aadhaar ? myDetails.aadhaar : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserOverviewSection;

const styles = StyleSheet.create({
  newTextStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4),
    marginVertical: Responsive.heightPx(0.3),
    width: Responsive.widthPx(50),
    fontFamily:"Ubuntu-Medium",
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  innerWrapper: {
    width: Responsive.widthPx(40),
  },
  gotraWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  flexAndWidth60: {
    alignSelf: "flex-start",
    width: Responsive.widthPx(60),
  },

  width40: {
    width: Responsive.widthPx(40),
  },
});
