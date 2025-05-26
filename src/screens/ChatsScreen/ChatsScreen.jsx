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

import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import Loader from "../../components/LoaderComponent/Loader";
import SearchComponent from "../../components/CommonComponents/SearchComponent";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import ChatScreenListComponents from "../../components/ChatsScreenComponents/ChatScreenListComponent";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import useGetUsers from "../../helpers/Hooks/useGetUsers";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import FeatherIcon from "react-native-vector-icons/Feather";
import useGoBack from "../../helpers/Hooks/useGoBack";



const ChatsScreen = () => {
  const { loginData } = useAuthStorage();
  const navigation = useNavigation()
  const { users, isLoading, fetchGetUsers } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const goBack = useGoBack()

  useEffect(() => {
    fetchGetUsers();
  }, [loginData, searchQuery]);

  const onRefresh = useCallback(() => {
    fetchGetUsers();
  }, [loginData]);

  const isExpired = loginData?.data?.membershipStatus === "expired";


  return (
    <View style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.chatsText}
        isBackHeader={true}
        icon={"arrow-left"}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <SearchComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={"Search...."}
        />

        {isLoading ? (
          <Loader visible={isLoading} />
        ) : (
          <>
            {users ? (
              <ChatScreenListComponents usersData={users} />
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
            <TouchableOpacity style={{ position: 'absolute', top: Responsive.heightPx(5), left: Responsive.widthPx(5) , zIndex:99}}  onPress={goBack}>
              <FeatherIcon
                name="arrow-left"
                color={pickColors.blackColor}
                size={Responsive.font(7)}
              />
            </TouchableOpacity>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Explore Chats</Text>
              <Text style={styles.popupMessage}>
                Please purchase a plan to continue exploring chats.
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenNames.SubscriptionScreen)}>
                <Text style={styles.buttonText}>Buy Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Responsive.heightPx(20),
  },
  noDataText: {
    fontSize: Responsive.font(4),
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
