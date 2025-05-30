import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { SwipeListView } from "react-native-swipe-list-view";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import useShortlistUser from "../../helpers/Hooks/useShortlistUser";
import Loader from "../../components/LoaderComponent/Loader";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import { handleAddUserShortlist } from "../../services/UserServices/UserServices";
import useGoBack from "../../helpers/Hooks/useGoBack";
import FeatherIcon from "react-native-vector-icons/Feather";
import { BlurView } from "@react-native-community/blur";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import { useFocusEffect } from "@react-navigation/native";



export default function ShortlistedScreen() {
  const { shortlistData, isLoading, error, fetchShortlistedUsers } =
    useShortlistUser();
  const { loginData } = useAuthStorage();
  const [removing, setRemoving] = useState(false);
  const goBack = useGoBack()
  const { data: userData, refetch } = useUserDetailsById(loginData?.data?._id);



  const deleteCard = async (userId) => {
    try {
      setRemoving(true);
      await new Promise((resolve) => setTimeout(resolve), 1000);
      const result = await handleAddUserShortlist(userId, loginData?.data?._id);
      if (result?.success) {
        successHandler(result?.data?.message);
        fetchShortlistedUsers();
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      setRemoving(false);
    }
  };
  useEffect(() => {
    showMessage({
      message: "Swipe left to remove an item from the shortlist.",
      type: "info",
      duration: 4000,
      icon: "info",
    });
  }, []);

useFocusEffect(
    useCallback(() => {
      if (loginData?.data?._id) {
        refetch();
      }
    }, [loginData?.data?._id])
  );


  const isExpired = userData?.membershipStatus === "expired";

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.ShortlistedStext}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      {isLoading ? (
        <Loader visible={isLoading} />
      ) : shortlistData?.length > 0 ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{marginTop:Responsive.heightPx(2)}}
        >
          <SwipeListView
            data={shortlistData || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Image
                    source={
                      typeof item?.userDetails?.image === "string"
                        ? { uri: item?.userDetails?.image }
                        : ImagePicker.placeholderIMage
                    }
                    style={styles.imageWrapper}
                  />
                </View>
                <View style={styles.contentWrapper}>
                  <Text style={styles.title}>{item?.userDetails?.name}</Text>
                  <Text style={styles.description}>
                    {item?.userDetails?.email}
                  </Text>
                </View>
              </View>
            )}
            renderHiddenItem={({ item }) => (
              <View style={styles.hiddenContainer}>
                {removing ? (
                  <ActivityIndicator
                    size="large"
                    color={pickColors.brandColor}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteCard(item.userId)}
                  >
                    <Icon name="trash" style={styles.deleteText} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-80}
          />
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
        </View>
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
            <TouchableOpacity style={{ position: 'absolute', top: Responsive.heightPx(5), left: Responsive.widthPx(5), zIndex:99 }} onPress={goBack}>
              <FeatherIcon
                name="arrow-left"
                color={pickColors.blackColor}
                size={Responsive.font(7)}
              />
            </TouchableOpacity>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Explore Matches</Text>
              <Text style={styles.popupMessage}>
                Please purchase a plan to continue exploring matches.
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenNames.SubscriptionScreen)}>
                <Text style={styles.buttonText}>Buy Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: Responsive.widthPx(5),
    borderRadius: 10,
    marginBottom: Responsive.heightPx(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Ubuntu-Medium",
  },
  description: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Ubuntu-Regular",

  },
  hiddenContainer: {
    alignItems: "flex-end",
    backgroundColor: pickColors.whiteColor,
    borderRadius: 10,
    height: "70%",
    justifyContent: "center",
    marginRight: Responsive.widthPx(5),
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: Responsive.widthPx(24),
    height: Responsive.heightPx(12),
    backgroundColor: "red",
    borderRadius: 10,
  },
  deleteText: {
    color: pickColors.whiteColor,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: Responsive.widthPx(4),
    fontSize: Responsive.font(8),
  },

  imageWrapper: {
    height: Responsive.heightPx(10),
    width: Responsive.widthPx(20),
    marginHorizontal: Responsive.widthPx(2),
    marginVertical: Responsive.heightPx(2),
    borderRadius: 10,
  },
  contentWrapper: {
    flexDirection: "column",
    width: Responsive.widthPx(60),
    gap: Responsive.heightPx(1),
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Responsive.heightPx(20),
  },
  noDataText: {
    fontSize: Responsive.font(3.5),
    color: pickColors.lightGreyColor,
    fontFamily: "SemiBold",
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
});
