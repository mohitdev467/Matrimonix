import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserFamilySection = ({ myDetails }) => {
  return (
    <View style={{flexDirection:"column", gap:Responsive.heightPx(1.5)}}>
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
            Family Income :
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
            {myDetails?.family_income
              ? myDetails?.family_income
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
            Father :
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
            {myDetails?.father_name
              ? myDetails?.father_name
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
            Father Occupation :
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
            {myDetails?.father_occupation
              ? myDetails?.father_occupation
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
            Mother :
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
            {myDetails?.mother_name
              ? myDetails?.mother_name
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
            Mother Occupation :
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
            {myDetails?.mother_occupation
              ? myDetails?.mother_occupation
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingRight: Responsive.widthPx(35),
        }}
      >
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
            Brother/(s) :
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
            {myDetails?.brother
              ? `${myDetails?.brother} Brothers`
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: Responsive.widthPx(35),
        }}
      >
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
            Sister/(s) :
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
            {myDetails?.sister
              ? `${myDetails?.sister} Sisters`
              : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
     
      
     
      
      

      
    </View>
  );
};

export default UserFamilySection;

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
