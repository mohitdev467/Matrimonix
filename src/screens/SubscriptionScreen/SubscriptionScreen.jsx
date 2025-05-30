import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { subscriptionScreenData } from "../../constants/CommonData/CommonData";
import { pickColors } from "../../helpers/theme/colors";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import Loader from "../../components/LoaderComponent/Loader";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
import usePackages from "../../helpers/Hooks/usePackages";
import FeatherIcon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../../Config/apiInstance";
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import axios from "axios";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { getPaymentStatus } from "../../services/UserServices/UserServices";
import LinearGradient from "react-native-linear-gradient";
import successHandler from "../../services/NotificationServices/SuccessHandler";

const SubscriptionScreen = () => {
  const { loginData,updateLoginData } = useAuthStorage();
  const { data } = usePackages();
  const navigation = useNavigation()

  const [subscriptionState, setSubscriptionState] = useState({
    subscriptionData: [],
    loading: false,
    refreshing: false,
  });
  const [selectedSubscriptionDetails, setSelectedSubscriptionDetails] = useState(null)
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);


  const updateSubscriptionState = (name, value) => {
    setSubscriptionState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchSubscriptionData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateSubscriptionState("subscriptionData", data);
    updateSubscriptionState("loading", false);
  };

  useEffect(() => {
    updateSubscriptionState("loading", true);
    fetchSubscriptionData();
  }, [loginData, data]);

  const onRefresh = useCallback(() => {
    updateSubscriptionState("refreshing", true);
    fetchSubscriptionData();
    setTimeout(() => updateSubscriptionState("refreshing", false), 2000);
  }, [loginData]);


  const getSessionId = async (item) => {
    const data = {
      customer_email: loginData?.data?.email,
      customer_name: loginData?.data?.name,
      customer_id: loginData?.data?._id,
      customer_phone:loginData?.data?.mobile,
      customer_uid: loginData?.data?._id,
      amount: item?.price || 0,
      version: Date.now(),
    };
    try {
      const com_url = `${API_BASE_URL}user/order`;
      const res = await axios.post(com_url, data);
     
      return res.data;
    } catch (err) {
      console.error('Error fetching session ID:', err);
    }
  };

  

  const startCheckout = async (sessionId, orderId) => {
    try {
      const session = new CFSession(sessionId, orderId, CFEnvironment.SANDBOX);
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();

      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#d90237')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#d90237')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();

      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      CFPaymentGatewayService.doPayment(dropPayment);

      setTimeout(async () => {
        const paymentStatus = await getPaymentStatus(orderId);
        
        if (paymentStatus?.data?.paymentStatus === 'SUCCESS') {
          successHandler(paymentStatus?.message)
          updateLoginData(paymentStatus?.data?.customer)
          navigation.navigate(screenNames.PaymentHistoryScreen);
        } else {
          navigation.navigate(screenNames.SubscriptionScreen, { status: 'failed' });
        }
      }, 5000);
    } catch (e) {
      console.log('Payment error:', e);
    }
  };

  const handlePurchase = async () => {
    const sessionId = await getSessionId(selectedSubscriptionDetails);
    await startCheckout(sessionId?.payment_session_id, sessionId?.order_id)

  }

  const renderItem = ({ item, index }) => {
    const isSelected = selectedSubscriptionId === item._id;

    let monthlyPriceResult = 0;

    if (item.price && !isNaN(item.price)) {
      const price = parseFloat(item.price);
      if (item.subscriptionType === "Yearly") {
        monthlyPriceResult = price / 12;
      } else if (item.subscriptionType === "Quarterly") {
        monthlyPriceResult = price / 3;
      } else if (item.subscriptionType === "Monthly") {
        monthlyPriceResult = price;
      }
    }

    monthlyPriceResult = monthlyPriceResult.toFixed(2);

    const handleSubscription = async (item) => {
      setSelectedSubscriptionId(item._id)
      setSelectedSubscriptionDetails(item)
    }
    return (
      <TouchableOpacity onPress={() => handleSubscription(item)}>
        <View
          style={[
            styles.card,
            isSelected && {
              backgroundColor: pickColors.brandColor,
            },
          ]}
        >
          <View style={styles.leftSideContent}>
            <View style={styles.topSection}>
              <View style={styles.topSectionInner}>
                <View>
                  <Text
                    style={[
                      styles.durationtext,
                      isSelected && {
                        color: pickColors.whiteColor,
                      },
                    ]}
                  >
                    {item.subscriptionType}
                  </Text>
                </View>
                <View>
                {item.subscriptionType === "Yearly" && (
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["orange", "yellow", "pink"]}
                    style={styles.bestValueButton}
                  >
                    <Text style={styles.bestValueText}>Best seller</Text>
                  </LinearGradient>
                )}
              </View>
              </View>
            </View>
            <View style={styles.bottomSection}>
              <View style={styles.cardContentWrapper}>
                <Text
                  style={[
                    styles.cardContentTitleValue,
                    isSelected && {
                      color: pickColors.whiteColor,
                      fontSize: Responsive.font(3.8),
                    },
                  ]}
                >
                  {item.title || commonUtils.notAvailable}
                </Text>
                <Text
                  style={[
                    styles.cardContentValue,
                    isSelected && {
                      color: pickColors.whiteColor,
                    },
                    {
                      fontFamily: "Ubuntu-Bold",
                      fontSize: Responsive.font(6),
                      position: "relative",
                      top: Responsive.heightPx(-1),
                    },
                  ]}
                >
                  <FeatherIcon
                    name="rupee"
                    style={{
                      fontSize: Responsive.font(5),
                      fontFamily: "Ubuntu-Bold",

                    }}
                  />{" "}
                  {`${item.price}`}
                </Text>
              </View>
              <View
                style={[styles.cardContentWrapper, { alignItems: "flex-start" }]}
              >
                <Text
                  style={[
                    styles.bottomSubTitle,
                    isSelected && {
                      color: pickColors.whiteColor,
                    },
                  ]}
                >
                  {item.description}{"  "}
                  <FeatherIcon
                    name="rupee"
                    style={{
                      fontSize: Responsive.font(3.5),
                      position: "relative",
                      marginTop: Responsive.heightPx(10),
                      fontFamily: "Ubuntu-Bold",

                    }}
                  />
                  {` ${Math.floor(monthlyPriceResult)}`}
                </Text>
                <Text
                  style={[
                    styles.cardContentValue,
                    isSelected && {
                      color: pickColors.whiteColor,
                    },
                  ]}
                >
                  {item.subscriptionType || commonUtils.notAvailable}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.subscriptionheading}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      {subscriptionState?.loading ? (
        <Loader visible={subscriptionState.loading} />
      ) : subscriptionState?.subscriptionData?.length > 0 ? (
        <>
          <FlatList
            data={subscriptionState?.subscriptionData}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            refreshing={subscriptionState.refreshing}
            onRefresh={onRefresh}
          />

          <View style={styles.infoWrapper}>
            <Text style={styles.infoText}>
              {subscriptionScreenData.informationDescription}
            </Text>
          </View>


          <ButtonComponent
            title={commonUtils.continuePurchase}
            onPress={handlePurchase}
            style={[styles.buttonStyle,selectedSubscriptionDetails === null && styles.disabledButton]}
            disabled={selectedSubscriptionDetails === null && true}
          />
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  flatListContent: {
    paddingVertical: Responsive.heightPx(3),
    paddingBottom: Responsive.heightPx(5),
  },
  card: {
    backgroundColor: pickColors.whiteColor,
    elevation: 2,
    shadowColor: pickColors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    width: Responsive.widthPx(92),
    marginRight: Responsive.widthPx(5),
    marginLeft: Responsive.widthPx(4),
    paddingHorizontal: Responsive.heightPx(1.5),
    paddingVertical: Responsive.heightPx(3.5),
    marginBottom: Responsive.heightPx(3),
    borderWidth: 1,
    borderColor: pickColors.secondaryBlueColor,
  },

  leftSideContent: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
    paddingRight: Responsive.widthPx(1),
  },

  bottomSection: {
    flexDirection: "column",
    gap: Responsive.heightPx(0.5),
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topSectionInner: {
    flexDirection: "row",
    gap: Responsive.widthPx(2),
    alignItems: "center",
  },

  bestValueButton: {
    paddingVertical: Responsive.heightPx(0.5),
    paddingHorizontal: Responsive.widthPx(2.8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  bestValueText: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.2),
  },

  durationtext: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4.7),
    fontFamily: "Ubuntu-Bold",
  },

  bottomSubTitle: {
    color: pickColors.blackColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
    width: Responsive.widthPx(60),
  },
  cardContentTitleValue: {
    color: pickColors.blackColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
  },
  cardContentValue: {
    color: pickColors.blackColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
    textAlign: "center",
  },

  cardContentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  infoWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(0),
  },
  infoText: {
    textAlign: "center",
    fontFamily: "Regular",
    color: pickColors.blackColor,
    fontSize: Responsive.font(3),
  },

  buttonStyle: {
    marginBottom: Responsive.heightPx(2),
    marginTop: Responsive.heightPx(2),
    marginHorizontal: Responsive.widthPx(5),
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
  disabledButton:{
    backgroundColor:pickColors.lightGreyColor
  }
});
