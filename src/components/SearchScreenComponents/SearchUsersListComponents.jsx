import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { getAllUsers } from "../../services/UserServices/UserServices";
import Loader from "../LoaderComponent/Loader";
import { pickColors } from "../../helpers/theme/colors";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import SearchComponent from "../CommonComponents/SearchComponent";
import screenNames from "../../helpers/ScreenNames/ScreenNames";

const SearchUsersListComponents = () => {
  const navigation = useNavigation();
  const { loginData } = useAuthStorage();
  const [searchQuery, setSearchQuery] = useState("");
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

  const getUsersListData = async () => {
    updateState("loading", true);
    try {
      const result = await getAllUsers(searchQuery);
      if (result?.success) {
        const filteredData = result.data.filter(
          (user) => user._id !== loginData?.data?._id
        );
        updateState("data", filteredData || []);
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
    getUsersListData();
  }, [loginData, searchQuery]);

  const onRefresh = useCallback(() => {
    updateState("refreshing", true);
    getUsersListData();
    setTimeout(() => updateState("refreshing", false), 2000);
  }, [loginData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(screenNames.DetailsScreen, {
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

      <View style={styles.contentWrapper}>
        <View style={styles.cardNameUpperWrp}>
          <View style={styles.nameHeartWrp}>
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
          <Text style={styles.cardName}>
            {item.occupation || commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={"Search by name, email, or mobile..."}
      />

      {state?.loading ? (
        <Loader visible={state.loading} />
      ) : (
        <>
          {state?.data?.length > 0 ? (
            <FlatList
              data={state?.data.sort((a, b) => a.name.localeCompare(b.name))}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              refreshing={state.refreshing}
              onRefresh={onRefresh}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default SearchUsersListComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  flatListContent: {
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPx(3),
    paddingBottom: Responsive.heightPx(5),
  },
  card: {
    flexDirection: "column",
    padding: Responsive.heightPx(1),
    backgroundColor: pickColors.whiteColor,
    elevation: 3,
    backgroundColor: pickColors.whiteColor,
    margin: Responsive.widthPx(2.2),
    borderRadius: 15,
  },
  imageStyle: {
    height: Responsive.heightPx(10),
    width: Responsive.widthPx(34),
    borderRadius: Responsive.widthPx(50),
    resizeMode: "contain",
  },
  imageContainer: {
    backgroundColor: pickColors.imageBgColor,
    padding: Responsive.widthPx(2),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  contentWrapper: {
    width: Responsive.widthPx(36),
    paddingVertical: Responsive.heightPx(1.3),
  },

  cardName: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.5),
  },
  cardDescription: {
    fontSize: Responsive.font(2.7),
    color: pickColors.lightGreyColor,
    fontFamily: "Regular",
  },

  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPx(2),
  },
  priceText: {
    color: pickColors.primaryButtonColor,
    backgroundColor: pickColors.skyBlueColor,
    paddingHorizontal: Responsive.widthPx(2.5),
    paddingVertical: Responsive.heightPx(0.5),
    alignSelf: "auto",
    textAlign: "center",
    borderRadius: 10,
  },

  priceValueWrp: {
    flexDirection: "row",
  },
  currencyText: {
    color: pickColors.primaryButtonColor,
  },
  priceValue: {
    color: pickColors.primaryButtonColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(5),
  },
  heartIcon: {
    position: "absolute",
    right: Responsive.widthPx(0),
    top: Responsive.heightPx(0),
    fontSize: Responsive.font(5.2),
    color: pickColors.lightGreyColor,
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

  cardNameUpperWrp: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
  },

  nameHeartWrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
