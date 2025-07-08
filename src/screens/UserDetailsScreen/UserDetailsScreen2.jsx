import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";
  import Icon from "react-native-vector-icons/FontAwesome";
  
  import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
  import useGoBack from "../../helpers/Hooks/useGoBack";
  import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
  import {
    getUserDetailsById,
    handleAddUserShortlist,
  } from "../../services/UserServices/UserServices";
  import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
  import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
  import { pickColors } from "../../helpers/theme/colors";
  import UserOverviewSection from "../../components/UsersDetailsScreenComponents/UserOverviewSection";
  import UserKundliAstroSection from "../../components/UsersDetailsScreenComponents/UserKundliAstroSection";
  import UserAppearanceSection from "../../components/UsersDetailsScreenComponents/UserAppearanceSection";
  import UserImportantDetailsSection from "../../components/UsersDetailsScreenComponents/UserImportantDetailsSection";
  import UserLifestyleSection from "../../components/UsersDetailsScreenComponents/UserLifestyleSection";
  import UserFamilySection from "../../components/UsersDetailsScreenComponents/UserFamilySection";
  import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
  import Loader from "../../components/LoaderComponent/Loader";
  import successHandler from "../../services/NotificationServices/SuccessHandler";
  import useShortlistUser from "../../helpers/Hooks/useShortlistUser";
  import { BlurView } from "@react-native-community/blur";
  import FeatherIcon from "react-native-vector-icons/Feather";
  import screenNames from "../../helpers/ScreenNames/ScreenNames";
  import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  
  
  const UserDetailsScreen = () => {
    const goBack = useGoBack();
    const route = useRoute();
    const navigation = useNavigation()
    const { loginData, updateLoginData } = useAuthStorage();
    const { id } = route.params || {};
    const { shortlistData } = useShortlistUser();
    const { data: userData, refetch } = useUserDetailsById(loginData?.data?._id);
  
  
    const [state, setState] = useState({
      data: null,
      loading: false,
      refreshing: false,
      isShortlisted: false,
      isShortlistingWorking: false,
    });
  
    const updateState = (name, value) => {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const fetchUserDetailsById = async () => {
      updateState("loading", true);
      try {
        const result = await getUserDetailsById(id);
        if (result?.success) {
          updateState("data", result?.data || []);
        }
      } catch (error) {
        console.error(commonUtils.errorFetchingData, error);
      } finally {
        updateState("loading", false);
      }
    };
  
    const handleShortlist = async (userId) => {
      try {
        updateState("isShortlistingWorking", true);
        const result = await handleAddUserShortlist(userId, loginData?.data?._id);
        if (result?.success) {
          updateState("isShortlisted", result?.data?.isShortlist);
          updateLoginData({ shortListedUserId: userId });
          successHandler(result?.data?.message);
        }
      } catch (error) {
        console.error(commonUtils.errorFetchingData, error);
      } finally {
        updateState("isShortlistingWorking", false);
      }
    };
  
    useEffect(() => {
      updateState("loading", true);
      fetchUserDetailsById(id);
    }, [id]);
  
    useEffect(() => {
      if (shortlistData && id) {
        const isUserShortlisted = shortlistData.some(
          (item) => item.userId === state?.data?._id
        );
        setState((prevState) => ({
          ...prevState,
          isShortlisted: isUserShortlisted,
        }));
      }
    }, [shortlistData, state?.data?._id]);
  
  
  useFocusEffect(
      useCallback(() => {
        if (loginData?.data?._id) {
          refetch();
        }
      }, [loginData?.data?._id])
    );
  
  
    const isExpired = userData?.membershipStatus === "expired";
  
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {state?.loading ? (
            <Loader visible={state.loading} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainWrappper}>
                <View>
                  <View style={styles.imageWrapper}>
                    <Icon
                      name="arrow-left"
                      color={pickColors.blackColor}
                      size={Responsive.font(6)}
                      onPress={goBack}
                      style={styles.goBackButton}
                    />
                    <Image
                      source={
                        state?.data?.image
                          ? { uri: state.data.image }
                          : ImagePicker.placeholderIMage
                      }
                      style={styles.imageWrapperMain}
                    />
                    <View style={styles.imageContent}>
                      <View>
                        <Text
                          style={[
                            styles.textStyle,
                            { fontFamily: "Bold", fontSize: Responsive.font(5) },
                          ]}
                        >
                          {state?.data?.firstName
                            ? `${state?.data?.firstName} ${state?.data?.lastName}`
                            : commonUtils.notAvailable}
                        </Text>
                        <Text
                          style={[
                            styles.textStyle,
                            { fontSize: Responsive.font(3.7) },
                          ]}
                        >
                          {state?.data?.occupation
                            ? state?.data?.occupation
                            : commonUtils.notAvailable}
                        </Text>
                      </View>
                      <View style={styles.chatWrapper}>
                        <FeatherIcon
                          name="message-square"
                          color={pickColors.whiteColor}
                          size={Responsive.font(6.5)}
                          onPress={() =>
                            navigation.navigate(screenNames.ChatsDetailsScreen, {
                              data: state?.data,
                              loginData: loginData,
                            })
                          } style={styles.goBackButton}
                        />
                      </View>
                    </View>
                  </View>
                </View>
  
                <View style={styles.userDetailsContainer}>
                  <View style={styles.aboutMyself}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: Responsive.widthPx(3),
                      }}
                    >
                      <View style={styles.aboutInnerWrapper}>
                        <View style={styles.aboutIcon}>
                          <Image
                            source={require("../../assets/Images/about-myself.png")}
                            style={styles.imageWrapperMain}
                          />
                        </View>
                        <Text style={styles.newTextStyle}>About Myself</Text>
                      </View>
                      {state.isShortlistingWorking ? (
                        <ActivityIndicator
                          size="large"
                          color={pickColors.brandColor}
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.iconWrapper}
                          onPress={() => handleShortlist(state?.data?._id)}
                        >
                          <Icon
                            name="heart"
                            size={24}
                            style={[
                              styles.icon,
                              {
                                color: state?.isShortlisted
                                  ? pickColors.brandColor
                                  : pickColors.blackColor,
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.newTextStyle,
                        {
                          fontSize: Responsive.font(3.8),
                          fontFamily: "Regular",
                          marginVertical: Responsive.heightPx(1.5),
                          paddingHorizontal: Responsive.widthPx(1),
                        },
                      ]}
                    >
                      {state?.data?.occupation
                        ? `I am a ${state?.data?.occupation}`
                        : commonUtils.notAvailable}
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
                      <UserOverviewSection myDetails={state?.data} />
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
                      <Text style={styles.newTextStyle}>
                        Kundli, Astro & Birth Date
                      </Text>
                    </View>
                    <View style={styles.sectionWrapper}>
                      <UserKundliAstroSection myDetails={state?.data} />
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
                      <UserAppearanceSection myDetails={state?.data} />
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
                      <UserImportantDetailsSection myDetails={state?.data} />
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
                      <UserLifestyleSection myDetails={state?.data} />
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
                      <UserFamilySection myDetails={state?.data} />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
  
  
          {isExpired && (
            <>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              />
  
              <View style={styles.popupContainer}>
                <TouchableOpacity style={{ position: 'absolute', top: Responsive.heightPx(5), left: Responsive.widthPx(5), zIndex: 99 }} onPress={goBack}>
                  <FeatherIcon
                    name="arrow-left"
                    color={pickColors.blackColor}
                    size={Responsive.font(7)}
                  />
                </TouchableOpacity>
                <View style={styles.popup}>
                  <Text style={styles.popupTitle}>Explore User Details</Text>
                  <Text style={styles.popupMessage}>
                    Please purchase a plan to continue exploring user details.
                  </Text>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenNames.SubscriptionScreen)}>
                    <Text style={styles.buttonText}>Buy Plan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </SafeAreaView>
      </>
    );
  };
  
  export default UserDetailsScreen;
  
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
      flexDirection: "row",
      justifyContent: "space-between"
  
    },
    userDetailsContainer: {
      // backgroundColor: pickColors.whiteColor,
      // elevation: 5,
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
      marginBottom: Responsive.heightPx(2),
      marginHorizontal: Responsive.widthPx(2),
      borderBottomWidth: 1,
      borderBottomColor: pickColors.lightGreyColor,
      elevation: 5,
      backgroundColor: pickColors.whiteColor,
      padding: 16,
      borderRadius: 10,
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
      fontFamily: "SemiBold",
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
  
    popupContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    popup: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: Responsive.widthPx(5),
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 5,
    },
    popupTitle: {
      fontSize: Responsive.font(5),
      fontFamily: "Ubuntu-Bold",
      marginBottom: 10,
    },
    popupMessage: {
      fontSize: Responsive.font(3.8),
      textAlign: "center",
      color: "grey",
      marginBottom: 20,
      fontFamily: "Ubuntu-Regular",
    },
    button: {
      backgroundColor: pickColors.brandColor,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: Responsive.font(3.8),
      fontFamily: "Ubuntu-Bold",
    },
  
    chatWrapper: {
      marginRight: Responsive.widthPx(13)
    }
  });
  
  