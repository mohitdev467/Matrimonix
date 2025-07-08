import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const PersonalDetailsScreen = ({ myDetails }) => {
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
            Full name :
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
            {myDetails?.firstName ? `${myDetails?.firstName} ${myDetails?.lastName}` : commonUtils.notAvailable}
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
                  Occupation Name:
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
                  {myDetails?.occupation
                    ? myDetails?.occupation
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
                  Gender :
                </Text>
              </View>
              <View style={styles.flexAndWidth60}>
                <Text
                  style={[
                    styles.newTextStyle,
                    {
                      fontSize: Responsive.font(3.8),
                      color: pickColors.blackColor,
                      textTransform:"capitalize"
                    },
                  ]}
                >
                  {myDetails?.gender ? myDetails?.gender : commonUtils.notAvailable}
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
                  Education :
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
                  {myDetails?.qualification
                    ? myDetails?.qualification
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
                  Work Place :
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
                  {myDetails?.work_place
                    ? myDetails?.work_place
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
            Email :
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
            {myDetails?.email ? myDetails?.email : commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalDetailsScreen;

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
