import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Responsive from "../../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../../helpers/theme/colors";
import ImagePicker from "../../../helpers/ImageHelper/ImagePicker";
import { commonUtils } from "../../../utilities/CommonUtils/CommonUtils";
import UserOverviewSection from "../../UsersDetailsScreenComponents/UserOverviewSection";
import UserKundliAstroSection from "../../UsersDetailsScreenComponents/UserKundliAstroSection";
import UserAppearanceSection from "../../UsersDetailsScreenComponents/UserAppearanceSection";
import UserImportantDetailsSection from "../../UsersDetailsScreenComponents/UserImportantDetailsSection";
import UserLifestyleSection from "../../UsersDetailsScreenComponents/UserLifestyleSection";
import UserFamilySection from "../../UsersDetailsScreenComponents/UserFamilySection";
import { ScrollView } from "react-native";

const UpdateProfileView = ({ userData }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.userDetailsContainer}>
        <View style={styles.aboutMyself}>
          <View style={styles.aboutInnerWrapper}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.aboutMySelf}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>About Myself</Text>
          </View>
          <Text
            style={[
              styles.newTextStyle,
              {
                fontSize: Responsive.font(3.8),
                fontFamily:"Ubuntu-Medium",
                marginVertical: Responsive.heightPx(1.5),
                paddingHorizontal: Responsive.widthPx(1),
              },
            ]}
          >
            {userData?.about_me
              ? `${userData?.about_me}`
              : commonUtils.aboutUsText}
          </Text>
        </View>

        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.overviewIcon}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>Overview</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <UserOverviewSection myDetails={userData} />
          </View>
        </View>

        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.astroIcon}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>Kundli, Astro & Birth Date</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <UserKundliAstroSection myDetails={userData} />
          </View>
        </View>

        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.eyeICon}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>My Appearance</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <UserAppearanceSection myDetails={userData} />
          </View>
        </View>

        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.importantDetailsIcons}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>Important Details</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <UserImportantDetailsSection myDetails={userData} />
          </View>
        </View>
        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.lifestyleIcon}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>Lifestyle</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <UserLifestyleSection myDetails={userData} />
          </View>
        </View>

        <View style={[styles.aboutMyself, { marginTop: 0 }]}>
          <View style={styles.commonSectionHeader}>
            <View style={styles.aboutIcon}>
              <Image
                source={ImagePicker.familyIcon}
                style={styles.imageWrapperMain}
              />
            </View>
            <Text style={styles.newTextStyle}>Family</Text>
          </View>
          <View style={{ marginTop: Responsive.heightPx(1) }}>
            <UserFamilySection myDetails={userData} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfileView;

const styles = StyleSheet.create({
  imageWrapper: {
    height: Responsive.heightPx(35),
    width: "100%",
    position: "relative",
  },
  imageContent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: pickColors.cardContentBg,
    width: "100%",
    paddingVertical: Responsive.heightPx(1),
    paddingHorizontal: Responsive.widthPx(4),
  },
  userDetailsContainer: {
    backgroundColor: pickColors.whiteColor,
    elevation: 5,
    marginHorizontal: Responsive.widthPx(1.5),
    borderRadius: 5,
    marginVertical: Responsive.heightPx(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  aboutMyself: {
    marginTop: Responsive.heightPx(3),
    paddingBottom: Responsive.heightPx(1.5),
    marginBottom: Responsive.heightPx(1.5),
    marginHorizontal: Responsive.widthPx(2),
    borderBottomWidth: 1,
    borderBottomColor: pickColors.lightGreyColor,
  },

  commonSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(2),
  },

  textStyle: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(4),
  },
  aboutIcon: {
    height: Responsive.heightPx(5),
    width: Responsive.widthPx(10),
  },
  newTextStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4.2),
    fontFamily:"Ubuntu-Medium",
  },

  sectionWrapper: {
    marginTop: Responsive.heightPx(1),
  },
  mainWrappper: {
    marginBottom: Responsive.heightPx(7),
  },
  goBackButton: {
    position: "absolute",
    top: Responsive.heightPx(2),
    left: Responsive.widthPx(4),
    zIndex: 9999,
  },
  imageWrapperMain: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  aboutInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(2),
  },
});
