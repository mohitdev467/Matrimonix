import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../../components/CommonComponents/CommonHeader";
import Loader from "../../components/LoaderComponent/Loader";
import SearchComponent from "../../components/CommonComponents/SearchComponent";
import { getAllServiceProvider } from "../../services/ServiceProviderServices/ServiceProviderServices";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import { useNavigation } from "@react-navigation/native";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { BlurView } from "@react-native-community/blur";
import FeatherIcon from "react-native-vector-icons/Feather";
import useGoBack from "../../helpers/Hooks/useGoBack";



const ServiceProviderScreen = () => {
  const navigation = useNavigation();
  const { loginData } = useAuthStorage();
  const goBack = useGoBack()

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

  const fetchServiceProvider = async () => {
    updateState("loading", true);
    try {
      const result = await getAllServiceProvider(searchQuery);
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
    fetchServiceProvider();
  }, [loginData, searchQuery]);

  const onRefresh = useCallback(() => {
    updateState("refreshing", true);
    fetchServiceProvider();
    setTimeout(() => updateState("refreshing", false), 2000);
  }, [loginData]);

  const isExpired = loginData?.data?.membershipStatus === "expired";


  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainWrapper}>
        <View style={styles.cardWrapper}>
          <View>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : ImagePicker.placeholderIMage
              }
              style={styles.imageWrapper}
            />
          </View>
          <View style={styles.rightWrapper}>
            <View style={styles.locationWrapper}>
              <Text style={styles.nameText}>
                {item.serviceProviderName || commonUtils.notAvailable}
              </Text>
            </View>
            <View style={styles.locationWrapper}>
              <Icon name="map-pin" style={styles.icon} />
              <Text style={styles.addressText}>
                {item.address || commonUtils.notAvailable}
              </Text>
            </View>

            <View
              style={[
                styles.locationWrapper,
                { marginTop: Responsive.heightPx(1) },
              ]}
            >
              <FontAwesomeIcon
                name="star"
                style={[styles.starIcon, { color: pickColors.brandColor }]}
              />
              <FontAwesomeIcon
                name="star"
                style={[styles.starIcon, { color: pickColors.brandColor }]}
              />
              <FontAwesomeIcon
                name="star"
                style={[styles.starIcon, { color: pickColors.brandColor }]}
              />
              <FontAwesomeIcon name="star" style={styles.starIcon} />
              <FontAwesomeIcon name="star" style={styles.starIcon} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.checkNowBtn}
          onPress={() =>
            navigation.navigate(screenNames.ServieProviderDetailsScreen, {
              id: item._id,
            })
          }
        >
          <Text style={styles.checkNowtext}>Check Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.ServiceProvider}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={"Search....."}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {state?.loading ? (
          <Loader visible={state.loading} />
        ) : (
          <>
            {state?.data?.length > 0 ? (
              <FlatList
                data={state?.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
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
      </ScrollView>


      {!isExpired && (
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
              <Text style={styles.popupTitle}>Explore Service Provider</Text>
              <Text style={styles.popupMessage}>
                Please purchase a plan to continue exploring servicer provider details.
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

export default ServiceProviderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  flatListContent: {
    gap: Responsive.heightPx(3),
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: Responsive.heightPx(1),
  },

  mainWrapper: {
    backgroundColor: pickColors.whiteColor,
    elevation: 4,
    shadowColor: pickColors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    width: Responsive.widthPx(90),
  },
  cardWrapper: {
    flexDirection: "row",
    gap: Responsive.widthPx(2.5),
  },
  imageWrapper: {
    height: Responsive.heightPx(13),
    width: Responsive.widthPx(26),
    borderRadius: 15,
    marginVertical: Responsive.heightPx(2),
    marginLeft: Responsive.widthPx(1),
  },

  locationWrapper: {
    flexDirection: "row",
    width: Responsive.widthPx(50),
    alignItems: "center",
    gap: Responsive.widthPx(1.2),
  },
  icon: {
    fontSize: Responsive.font(4),
    color: pickColors.blackColor,
  },
  starIcon: {
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
  },

  rightWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
    paddingVertical: Responsive.heightPx(3.5),
  },
  nameText: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4.2),
    flex: 1,
    fontFamily: "Ubuntu-Medium",

  },
  addressText: {
    fontSize: Responsive.font(2.8),
    color: pickColors.lightGreyColor,
    fontFamily: "Ubuntu-Regular",

  },

  checkNowBtn: {
    backgroundColor: pickColors.brandColor,
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: Responsive.heightPx(5.5),
    width: Responsive.widthPx(28),
    position: "relative",
    bottom: Responsive.heightPx(2),
    right: Responsive.widthPx(3),
    borderRadius: 10,
  },
  checkNowtext: {
    color: pickColors.whiteColor,
    flex: 1,
    fontSize: Responsive.font(3.5),
    textAlign: "center",
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
