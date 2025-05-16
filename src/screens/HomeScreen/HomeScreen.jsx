import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import useBackHandler from "../../helpers/Hooks/useBackHandler";
  import { pickColors } from "../../helpers/theme/colors";
  import CommonHeader from "../../components/CommonComponents/CommonHeader";
  import SliderComponent from "../../components/CommonComponents/SliderComponent";
  import { homeSliderData } from "../../constants/CommonData/CommonData";
  import HomeScreenCardComponent from "../../components/HomeScreenComponents/HomeScreenCardComponent";
  import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
  import RecentUserCardListComponent from "../../components/HomeScreenComponents/RecentUserCardListComponent";
  import NewsCardHomeScreen from "../../components/HomeScreenComponents/NewsCardHomeScreen";
  import useStatsData from "../../helpers/Hooks/useStatsData";
  import { useFocusEffect, useNavigation } from "@react-navigation/native";
  
  const HomeScreen = () => {
    useBackHandler(true);
    const navigation = useNavigation();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { loginData } = useAuthStorage();
  
    const { statsData, fetchStatsData } = useStatsData();
  
    useFocusEffect(
      useCallback(() => {
        setIsRefreshing(true);
        fetchStatsData().finally(() => setIsRefreshing(false));
      }, [])
    );
    const onRefresh = useCallback(() => {
      setIsRefreshing(true);
      fetchStatsData();
      setTimeout(() => setIsRefreshing(false), 2000);
    }, [loginData]);
  
    return (
      <View style={styles.container}>
        <CommonHeader />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <SliderComponent homeSliderData={homeSliderData} />
  
          <HomeScreenCardComponent statsData={statsData} />
  
          <RecentUserCardListComponent loginData={loginData} />
  
          <NewsCardHomeScreen loginData={loginData} />
        </ScrollView>
      </View>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: pickColors.whiteColor,
    },
  });
  