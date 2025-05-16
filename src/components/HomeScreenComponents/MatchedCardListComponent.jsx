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
import { Colors, pickColors } from "../../helpers/theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { handleRecentUserById } from "../../services/UserServices/UserServices";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";

const MatchedCardListComponent = ({ loginData }) => {
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

  const fetchRecentUser = async () => {
    updateStateData("loading", true);

    const result = await handleRecentUserById(
      loginData?.data?.email,
      loginData?.data?.gender
    );
    if (result.success) {
      updateStateData("loading", false);
      updateStateData("data", result?.data);
    } else {
      ErrorHandler(result.error.message);
      updateStateData("loading", false);
    }
  };

  useEffect(() => {
    fetchRecentUser();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.card}>
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
      <Text style={styles.cardText}>
        {item.name || commonUtils.notAvailable}
      </Text>
      <Text style={styles.cardSubTitle}>
        {`${item.country_code}-${item.mobile}` || commonUtils.notAvailable}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.productHead}>
        <Text style={styles.productTitle}>{commonUtils.NewMatches}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.RecentUserScreen)}
        >
          <Text style={styles.seeAlltextStyle}>{commonUtils.viewAllText}</Text>
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
          <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
        </View>
      )}
    </View>
  );
};

export default MatchedCardListComponent;

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
    fontFamily: "SemiBold",
  },
  seeAlltextStyle: {
    fontSize: Responsive.font(3.8),
    color: pickColors.brandColor,
    fontFamily: "SemiBold",
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
    width: Responsive.widthPx(28),
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(1.5),
    paddingHorizontal: Responsive.widthPx(2),
    marginHorizontal: Responsive.widthPx(2.6),
    flexDirection: "column",
    gap: Responsive.heightPx(0.5),
  },
  cardText: {
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    textAlign: "center",
    textTransform: "capitalize",
  },

  imageStyle: {
    height: Responsive.heightPx(8),
    width: Responsive.widthPx(16),
    borderRadius: Responsive.widthPx(100),
    marginBottom: Responsive.widthPx(1),
    resizeMode: "contain",
  },

  cardSubTitle: {
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
    fontFamily: "Regular",
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
