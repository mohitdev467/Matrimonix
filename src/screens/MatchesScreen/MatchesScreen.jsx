import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import CommonHeader from "../../components/CommonComponents/CommonHeader";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import MatchesUsersList from "../../components/MatchesScreenComponent/MatchesUsersList";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { handleMatchedUsersById } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import Loader from "../../components/LoaderComponent/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

const MatchesScreen = () => {
  const { loginData } = useAuthStorage();
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

  console.log("state-----", state.data)

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
});
