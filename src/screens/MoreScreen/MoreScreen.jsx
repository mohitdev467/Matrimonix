import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/FontAwesome";
  import FeatherIcon from "react-native-vector-icons/Feather";
  import { CommonActions, useNavigation } from "@react-navigation/native";
  import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
  import { moreScreenOptonsList } from "../../utilities/MoreScreenUtils/MoreScreenUtils";
  import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
  import ModalComponent from "../../components/CommonComponents/ModalComponent";
  import Loader from "../../components/LoaderComponent/Loader";
  import { pickColors } from "../../helpers/theme/colors";
  import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
  import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
  import screenNames from "../../helpers/ScreenNames/ScreenNames";
  import successHandler from "../../services/NotificationServices/SuccessHandler";
  import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
  
  const MoreScreen = () => {
    const navigation = useNavigation();
    const { clearLoginData } = useAuthStorage();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleLogout = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await clearLoginData();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenNames.LoginScreen }],
          })
        );
        successHandler(commonUtils.userLogoutSuccess);
      } catch (error) {
        ErrorHandler(commonUtils.userLogoutError);
      } finally {
        setIsLoading(false);
        setLogoutModalVisible(false);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{commonUtils.moreTextHeading}</Text>
        </View>
  
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.flatListContent}
        >
          {moreScreenOptonsList &&
            moreScreenOptonsList.map((item, index) => (
              <TouchableOpacity
                style={styles.moreListWrapper}
                key={index}
                onPress={() => navigation.navigate(item.link)}
              >
                <View style={styles.leftSideWrp}>
                  {item.isFeather ? (
                    <FeatherIcon
                      name={item.iconName}
                      style={[
                        styles.icon,
                        { color: pickColors.primaryButtonColor },
                      ]}
                    />
                  ) : (
                    <Icon
                      name={item.iconName}
                      style={[
                        styles.icon,
                        { color: pickColors.primary },
                      ]}
                    />
                  )}
                  <Text style={styles.mainTitle}>{item.title}</Text>
                </View>
                {item?.isMore && (
                  <Icon name="chevron-right" style={styles.icon} />
                )}
              </TouchableOpacity>
            ))}
  
          <ButtonComponent
            title={commonUtils.logoutText}
            onPress={() => setLogoutModalVisible(true)}
            style={styles.logoutButtonStyle}
            icon={"log-out"}
            textStyle={styles.logoutTextStyle}
          />
        </ScrollView>
        <ModalComponent
          isVisible={isLogoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          title={commonUtils.logoutText}
        >
          <Text style={styles.modalText}>
            {commonUtils.areYouSureWantToLogout}
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setLogoutModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>No</Text>
            </TouchableOpacity>
  
            {isLoading ? (
              <Loader visible={isLoading} />
            ) : (
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
            )}
          </View>
        </ModalComponent>
      </SafeAreaView>
    );
  };
  
  export default MoreScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: pickColors.whiteColor,
    },
    headerContainer: {
      paddingHorizontal: Responsive.widthPx(5),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Responsive.heightPx(2),
    },
  
    title: {
      fontFamily:"Ubuntu-Medium",
      fontSize: Responsive.font(5),
    },
  
    moreListWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: Responsive.widthPx(6),
      alignItems: "baseline",
      paddingVertical: Responsive.heightPx(2.4),
      borderBottomWidth: 1,
      borderBottomColor: pickColors.borderColor,
    },
  
    leftSideWrp: {
      flexDirection: "row",
      gap: Responsive.widthPx(4),
      alignItems: "baseline",
    },
    icon: {
      fontSize: Responsive.font(4.5),
      color: pickColors.secondaryBlackColor,
    },
  
    mainTitle: {
      fontFamily:"Ubuntu-Medium",
      fontSize: Responsive.font(4),
      color: pickColors.blackColor,
    },
  
    logoutButtonStyle: {
      marginHorizontal: Responsive.widthPx(5),
      marginVertical: Responsive.heightPx(4),
      alignItems: "center",
      fontFamily:"Ubuntu-Medium",

    },
  
    logoutTextStyle: {
      fontSize: Responsive.font(4.5),
      fontFamily:"Ubuntu-Medium",
    },
  
    modalText: {
      textAlign: "center",
      fontSize: Responsive.font(3.8),
      fontFamily: "Ubuntu-Medium",
      marginVertical: Responsive.heightPx(2),
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: Responsive.heightPx(2),
      height: Responsive.heightPx(6),
    },
    modalButton: {
      paddingVertical: Responsive.heightPx(1.5),
      paddingHorizontal: Responsive.widthPx(10),
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: pickColors.cardContentBg,
    },
    confirmButton: {
      backgroundColor: pickColors.brandColor,
    },
    cancelButtonText: {
      color: pickColors.whiteColor,
      fontSize: Responsive.font(4),
      fontFamily: "Ubuntu-Medium",
    },
    confirmButtonText: {
      color: pickColors.whiteColor,
      fontFamily: "Ubuntu-Medium",
      fontSize: Responsive.font(4),
    },
  });
  