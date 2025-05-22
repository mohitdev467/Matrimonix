import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { getAllNews } from "../../services/NewsServices/NewsServices";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import { TextSemiBold } from "../CommonComponents/CustomText";

const NewsCardHomeScreen = ({ loginData }) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    data: [],
    loading: false,
    search: "",
  });

  const updateStateData = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchRecentNews = async () => {
    updateStateData("loading", true);

    const result = await getAllNews();
    if (result.success) {
      updateStateData("loading", false);
      updateStateData("data", result?.data);
    } else {
      ErrorHandler(result.error.message);
      updateStateData("loading", false);
    }
  };

  useEffect(() => {
    fetchRecentNews();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(screenNames.NewsDetailsScreen, {
          id: item._id,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof item.image === "string"
              ? { uri: item.image }
              : ImagePicker.placeholderIMage
          }
          style={[
            styles.imageStyle,
            item.image ?? { resizeMode: "contain", borderRadius: 10 },
          ]}
        />
      </View>
      <TextSemiBold style={styles.cardText}>
        {item.title || commonUtils.notAvailable}
      </TextSemiBold>
      <TextSemiBold style={styles.cardSubTitle}>
        {formattedDate(item.createdAt) || commonUtils.notAvailable}
      </TextSemiBold>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.productHead}>
        <TextSemiBold style={styles.productTitle}>{commonUtils.recentNewsHeading}</TextSemiBold>
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.NewsScreen)}
        >
          <TextSemiBold style={styles.seeAlltextStyle}>{commonUtils.viewAllText}</TextSemiBold>
        </TouchableOpacity>
      </View>

      {state?.data?.length > 0 ? (
        <FlatList
          data={state?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <TextSemiBold style={styles.noDataText}>{commonUtils.noDataFound}</TextSemiBold>
        </View>
      )}
    </View>
  );
};

export default NewsCardHomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Responsive.heightPx(1),
  },

  productHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Responsive.widthPx(4),
  },
  productTitle: {
    fontSize: Responsive.font(4.7),
    fontFamily:"Ubuntu-Medium",
  },
  seeAlltextStyle: {
    fontSize: Responsive.font(3.8),
    color: pickColors.brandColor,
    fontFamily:"Ubuntu-Medium",
  },

  flatListContent: {
    paddingVertical: Responsive.heightPx(3),
  },
  card: {
    backgroundColor: pickColors.whiteColor,
    elevation: 2,
    shadowColor: pickColors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    width: Responsive.widthPx(28.5),
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(1.5),
    paddingHorizontal: Responsive.widthPx(1),
    marginHorizontal: Responsive.widthPx(2),
    flexDirection: "column",
    gap: Responsive.heightPx(1),
  },
  cardText: {
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
    fontFamily:"Ubuntu-Medium",
    textAlign: "center",
    textTransform: "capitalize",
  },

  imageStyle: {
    height: Responsive.heightPx(8),
    width: Responsive.widthPx(16),
    borderRadius: Responsive.widthPx(100),
    marginBottom: Responsive.widthPx(1),
    resizeMode: "cover",
  },

  cardSubTitle: {
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
    fontFamily:"Ubuntu-Regular",
    textAlign: "center",
    textTransform: "capitalize",
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
});
