import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { pickColors } from "../../helpers/theme/colors";
import useGoBack from "../../helpers/Hooks/useGoBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import UpdateProfileFormComponent from "../../components/MoreScreenComponents/UpdateProfileFormComponent/UpdateProfileFormComponent";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import UpdateProfileView from "../../components/MoreScreenComponents/UpdateProfileFormComponent/UpdateProfileView";
import Loader from "../../components/LoaderComponent/Loader";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import { getImageUrl, handleUpdateUser } from "../../services/UserServices/UserServices";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import { launchImageLibrary } from "react-native-image-picker";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";


const UpdateProfileScreen = () => {
  const goBack = useGoBack();
  const { loginData, updateLoginData } = useAuthStorage();
  const [isEditData, setIsEditData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { data: userData } = useUserDetailsById(loginData?.data?._id);

  const handleEditData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEditData(true);
    setIsLoading(false);
  };

  const handleUpdateData = async (data) => {
    try {
      setIsLoading(true);
      const result = await handleUpdateUser(loginData?.data?._id, data);

      if (result?.data?.success) {
        await updateLoginData(result?.data);
        setIsEditData(false);
        successHandler(
          result.data.message || commonUtils.userUpateSuccess,
          "bottom"
        );
      } else {
        ErrorHandler(result.error.message || commonUtils.unexpectedError);
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleImageUpload = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" });

      if (result?.assets && result.assets.length > 0) {
        setUploading(true);

        const selectedImage = result.assets[0];
        const imageUri = {
          uri: selectedImage.uri,
          name: selectedImage.fileName,
          type: selectedImage.type,
        };

        const uploadedImageUrl = await getImageUrl(imageUri);

        const updatedUser = {
          ...loginData.data,
          image: uploadedImageUrl,
        };

        const response = await handleUpdateUser(loginData.data._id, updatedUser);

        if (response?.data?.success) {
          await updateLoginData(response.data);
          successHandler("Profile image updated", "bottom");
        }
      }
    } catch (error) {
      ErrorHandler("Failed to update image");
    } finally {
      setUploading(false);
    }
  };



  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={pickColors.brandColor}
        translucent={true}
      />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={ImagePicker.updateProfileBgBackImage}
          tintColor={pickColors.lightBrandColor}
          style={styles.bgBackBanner}
        >
          <ImageBackground
            source={ImagePicker.updateProfileBgFrontImage}
            tintColor={pickColors.brandColor}
            style={styles.frontBanner}
          >
            <View style={styles.headerContainerForBack}>
              <TouchableOpacity onPress={goBack}>
                <Icon
                  name={"arrow-left"}
                  style={[
                    styles.icon,
                    {
                      fontSize: Responsive.font(5.5),
                      color: pickColors.whiteColor,
                    },
                  ]}
                />
              </TouchableOpacity>
              <View style={styles.updateTopWrapper}>
                <Text style={styles.title}>
                  {commonUtils.updateProfileHeading}
                </Text>
                <TouchableOpacity onPress={handleEditData}>
                  <FeatherIcon
                    name={"edit"}
                    style={[
                      styles.icon,
                      {
                        fontSize: Responsive.font(6),
                        color: pickColors.whiteColor,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={handleImageUpload} style={{ position: "relative" }}>
                <Image
                  source={
                    typeof loginData?.data?.image === "string"
                      ? { uri: loginData?.data?.image }
                      : ImagePicker.dummyUserImage
                  }
                  style={styles.profileImage}
                />
                <FeatherIcon
                  name="camera"
                  size={20}
                  color={pickColors.whiteColor}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: Responsive.widthPx(20),
                    backgroundColor: pickColors.brandColor,
                    padding: 8,
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>

              <View style={styles.userNameWrapper}>
                <FeatherIcon name="user" style={styles.newIcon} />
                <Text style={styles.userNameStyle}>
                  {userData?.name || commonUtils.notAvailable}
                </Text>
              </View>
              <View style={styles.userNameWrapper}>
                <FeatherIcon name="mail" style={styles.newIcon} />
                <Text style={styles.userNameStyle}>
                  {userData?.email || commonUtils.notAvailable}
                </Text>
              </View>
              <View style={styles.userNameWrapper}>
                <FeatherIcon name="phone" style={styles.newIcon} />
                <Text style={styles.userNameStyle}>
                  {userData?.mobile
                    ? `${userData?.country_code}-${userData?.mobile}`
                    : commonUtils.notAvailable}
                </Text>
              </View>
              <View style={styles.userNameWrapper}>
                <FeatherIcon name="map-pin" style={styles.newIcon} />
                <Text style={styles.userNameStyle}>
                  {`${userData?.family_address || commonUtils.notAvailable}`}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <Loader visible={isLoading} />
          </View>
        ) : isEditData ? (
          <UpdateProfileFormComponent handleUpdateData={handleUpdateData} userData={userData} />
        ) : (
          <UpdateProfileView userData={userData} />
        )}
      </SafeAreaView>
    </>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  bgBackBanner: {
    height: Responsive.heightPx(45),
    marginTop: Responsive.heightPx(3),
    position: "relative",
  },

  frontBanner: {
    height: Responsive.heightPx(40),
    position: "relative",
  },
  headerContainerForBack: {
    paddingHorizontal: Responsive.widthPx(4),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
    marginTop: Responsive.heightPx(2),
    gap: Responsive.widthPx(8),
  },

  title: {
    fontFamily:"Ubuntu-Medium",
    fontSize: Responsive.font(4.6),
    color: pickColors.whiteColor,
  },
  icon: {
    fontSize: Responsive.font(5),
    color: pickColors.blackColor,
  },

  profileImage: {
    height: Responsive.heightPx(12),
    width: Responsive.widthPx(24),
    marginVertical: Responsive.heightPx(1.7),
    marginHorizontal: Responsive.widthPx(6),
    borderRadius: 100,
    resizeMode: "contain",
  },

  trainerLevelWrp: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1.4),
    backgroundColor: pickColors.brandColor,
    paddingHorizontal: Responsive.widthPx(3),
    borderRadius: 20,
    paddingVertical: Responsive.heightPx(0.3),
  },

  trainerLevelText: {
    color: pickColors.whiteColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3),
  },
  icon: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3),
  },

  userNameWrapper: {
    flexDirection: "row",
    marginHorizontal: Responsive.widthPx(6),
    gap: Responsive.widthPx(2),
    alignItems: "center",
    marginBottom: Responsive.heightPx(2),
    width: Responsive.widthPx(70),
  },

  newIcon: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(5),
  },

  userNameStyle: {
    fontFamily:"Ubuntu-Medium",
    fontSize: Responsive.font(4),
  },

  emailUserText: {
    marginHorizontal: Responsive.widthPx(6),
    color: pickColors.lightGreyColor,
    marginTop: Responsive.heightPx(1),
  },

  updateTopWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingRight: Responsive.widthPx(4),
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  modalOverlayStyle: {
    flex: 1,
  },

  modalContent: {
    height: Responsive.heightPx(80),
  },

  modalContainerStyle: {
    width: "95%",
    overflow: "auto",
  },
});
