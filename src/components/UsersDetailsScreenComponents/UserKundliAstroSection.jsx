import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserKundliAstroSection = ({ myDetails }) => {
  return (
    <View style={{flexDirection:"column", gap:Responsive.heightPx(1.5)}}>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Age :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {`${myDetails?.age} Years` || "Not available"}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Date of Birth :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.dob || "Not available"}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Birth Time :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.birth_time
              ? myDetails?.birth_time
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Birth Place :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.birth_place
              ? myDetails?.birth_place
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Caste :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.caste ? myDetails?.caste : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Marital Status:
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.marital_status
              ? myDetails?.marital_status
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.mainWrappeer}>
        <View style={styles.width40px}>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.7),
                color: pickColors.subHeadingColor,
              },
            ]}
          >
            Manglik :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.manglik ? myDetails?.manglik : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserKundliAstroSection;

const styles = StyleSheet.create({
  newTextStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(3.8),
    marginVertical: Responsive.heightPx(0.3),
    fontFamily:"Ubuntu-Medium",
  },

  mainWrappeer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  width40px: {
    width: Responsive.widthPx(40),
  },
  flexAndWidth60: {
    alignSelf: "flex-start",
    width: Responsive.widthPx(60),
  },
});
