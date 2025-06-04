import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import CommonHeader from "../../components/CommonComponents/CommonHeader";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import MatchesUsersList from "../../components/MatchesScreenComponent/MatchesUsersList";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { handleMatchedUsersById } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import Loader from "../../components/LoaderComponent/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import useGoBack from "../../helpers/Hooks/useGoBack";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import screenNames from "../../helpers/ScreenNames/ScreenNames";



const MatchesScreen = () => {
  const { loginData } = useAuthStorage();
  const navigation = useNavigation()
  const goBack = useGoBack()
  const { data: userData, refetch } = useUserDetailsById(loginData?.data?._id);


  const [state, setState] = useState({
    data: null,
    loading: false,
    refreshing: false,
  });



  const updateState = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchMatchUserDetailsById = async (isRefreshing = false) => {
    if (isRefreshing) updateState("refreshing", true);
    else updateState("loading", true);

    try {
      const result = await handleMatchedUsersById(loginData?.data?._id);
      if (result?.success) {
        updateState("data", result?.data || []);
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      if (isRefreshing) updateState("refreshing", false);
      else updateState("loading", false);
    }
  };

  useEffect(() => {
    fetchMatchUserDetailsById();
  }, [loginData]);

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
      <CommonHeader />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={() => fetchMatchUserDetailsById(true)}
            tintColor={pickColors.brandColor}
          />
        }
      >
        <View style={styles.matchHeader}>
          <Text style={styles.findYourText}>Find Your</Text>
          <Text style={styles.matchText}>Match</Text>
        </View>
        {state?.loading && !state.refreshing ? (
          <Loader visible={state.loading} />
        ) : (
          <>
            {state?.data?.length > 0 ? (
              <MatchesUsersList matchedData={state?.data} />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

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
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  matchHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1),
    marginHorizontal: Responsive.widthPx(5),
    marginBottom: Responsive.heightPx(1),
    marginTop: Responsive.heightPx(2),
  },
  findYourText: {
    fontSize: Responsive.font(6.2),
    color: pickColors.getStartedBtnColor,
    fontFamily: "Ubuntu-Regular",
  },
  matchText: {
    fontSize: Responsive.font(6.2),
    color: pickColors.brandColor,
    fontFamily: "Ubuntu-Bold",
  },

  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Responsive.heightPx(20),
  },
  noDataText: {
    fontSize: Responsive.font(4),
    color: "grey",
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
