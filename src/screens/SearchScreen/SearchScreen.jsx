import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { pickColors } from "../../helpers/theme/colors";
  import CommonHeader from "../../components/CommonComponents/CommonHeader";
  
  import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
  import SearchUsersListComponents from "../../components/SearchScreenComponents/SearchUsersListComponents";
import { SafeAreaView } from "react-native-safe-area-context";
  
  const SearchScreen = () => {
    const { loginData } = useAuthStorage();
  
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <CommonHeader />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SearchUsersListComponents loginData={loginData} />
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SearchScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: pickColors.whiteColor,
    },
  });
  