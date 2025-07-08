import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const UserOverviewSection = ({ myDetails }) => {
  return (
    <View style={{flexDirection:"column", gap:Responsive.heightPx(1.5)}}>
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
            Height :
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
            {myDetails?.height
              ? `${myDetails?.height}`
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
            Weight :
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
            {myDetails?.weight
              ? `${myDetails?.weight}KG`
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
            Blood Group:
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
            {myDetails?.blood_group
              ? myDetails?.blood_group
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
            Age :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {`${myDetails?.age} Years` || "Not available"}
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
            Date of Birth :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.dob || "Not available"}
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
            Caste :
          </Text>
        </View>
        <View style={styles.flexAndWidth60}>
          <Text style={styles.newTextStyle}>
            {myDetails?.caste ? myDetails?.caste : commonUtils.notAvailable}
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
