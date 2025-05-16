import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
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

const ChatsScreen = () => {
  const { loginData } = useAuthStorage();
  const { users, isLoading, fetchGetUsers } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGetUsers();
  }, [loginData, searchQuery]);

  const onRefresh = useCallback(() => {
    fetchGetUsers();
  }, [loginData]);

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
});
