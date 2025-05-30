import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserLifestyleSection = ({ myDetails }) => {
  return (
    <View style={{ flex: 1 }}>
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
            Dietary Habits :
          </Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                color: pickColors.blackColor,
                textAlign: "left",
              },
            ]}
          >
            {myDetails?.dietary ? myDetails?.dietary : commonUtils.notAvailable}
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
            Drinking Habits :
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
            {myDetails?.drinking
              ? myDetails?.drinking
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
            Smoking Habits :
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
            {myDetails?.smoking ? myDetails?.smoking : commonUtils.notAvailable}
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
            Languages :
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
            {myDetails?.languages
              ? myDetails?.languages
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
            Hobbies :
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
            {myDetails?.hobbies ? myDetails?.hobbies : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserLifestyleSection;

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
