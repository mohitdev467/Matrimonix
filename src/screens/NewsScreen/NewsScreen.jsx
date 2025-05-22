import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { pickColors } from "../../helpers/theme/colors";
import { getAllNews } from "../../services/NewsServices/NewsServices";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import Loader from "../../components/LoaderComponent/Loader";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import NewsListComponent from "../../components/NewsScreenComponents/NewsListComponent";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";

const NewsScreen = () => {
  const { loginData } = useAuthStorage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [state, setState] = useState({
    data: [],
    loading: false,
    refreshing: false,
  });

  const updateState = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getNewsListData = async () => {
    updateState("loading", true);
    try {
      const result = await getAllNews();
      if (result?.success) {
        updateState("data", result?.data || []);
      } else {
        ErrorHandler(result.error.message);
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      updateState("loading", false);
    }
  };

  useEffect(() => {
    getNewsListData();
  }, [loginData]);


  const uniqueCategories = state?.data?.reduce((acc, item) => {
    if (!acc.some((el) => el.category === item.category)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const onRefresh = useCallback(() => {
    updateState("refreshing", true);
    getNewsListData();
    setTimeout(() => updateState("refreshing", false), 2000);
  }, [loginData]);

  const filteredNews = selectedCategory
    ? state.data.filter((news) => news.category === selectedCategory)
    : state.data;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pickColors.whiteColor }}>
      <View style={styles.container}>
        <HeaderWithSearchBack
          headerTitle={commonUtils.NewsText}
          isBackHeader={true}
          icon={"arrow-left"}
        />
        {state?.loading ? (
          <Loader visible={state.loading} />
        ) : (
          <>
            {uniqueCategories?.length > 0 ? (
              <>
                <FlatList
                  data={[{ category: "All" }, ...uniqueCategories]}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedCategory(
                          item.category === "All" ? null : item.category
                        )
                      }
                      style={[
                        styles.newsTabContainer,
                        selectedCategory === item.category &&
                          styles.selectedTab,
                        selectedCategory === null &&
                          item.category === "All" &&
                          styles.selectedTab,
                      ]}
                    >
                      <Text style={styles.newsTabTitle}>{item.category}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => `${item.category}-${index}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContent}
                  refreshing={state.refreshing}
                  onRefresh={onRefresh}
                />
                <NewsListComponent newsData={filteredNews} />
              </>
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: pickColors.whiteColor,
  },

  flatListContent: {
    marginVertical: Responsive.heightPx(3),
    paddingHorizontal: Responsive.widthPx(4),
    paddingBottom: Responsive.heightPx(5),
    height: Responsive.heightPx(11),
  },
  newsTabContainer: {
    backgroundColor: pickColors.blackColor,
    paddingVertical: Responsive.heightPx(1.6),
    paddingHorizontal: Responsive.widthPx(7),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Responsive.widthPx(4),
    borderRadius: 50,
  },
  selectedTab: {
    backgroundColor: pickColors.brandColor,
    borderWidth: 2,
    borderColor: pickColors.brandColor,
    paddingVertical: Responsive.heightPx(0),
  },
  newsTabTitle: {
    color: pickColors.whiteColor,
    textTransform: "capitalize",
    fontSize: Responsive.font(3.5),
    fontFamily: "Ubuntu-Medium",
  },
});
