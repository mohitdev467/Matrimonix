import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../../components/LoaderComponent/Loader";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { getServieProviderById } from "../../services/ServiceProviderServices/ServiceProviderServices";
import TextSpliter from "../../helpers/CommonFunctions/TextSpliter";

const ServiceProviderDetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const goBack = useGoBack();
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

  const getNewsDataById = async () => {
    updateState("loading", true);
    try {
      const result = await getServieProviderById(id);
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
    getNewsDataById();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.headerDetails}>
        <Icon
          name="arrow-left"
          color={pickColors.blackColor}
          size={Responsive.font(6)}
          onPress={goBack}
          style={styles.goBackButton}
        />
        <Text style={styles.headerText}>{state?.data?.category}</Text>
        <Text style={styles.hiddenThing}></Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {state?.loading ? (
          <Loader visible={state.loading} />
        ) : (
          <View style={styles.mainWrapper}>
            <View style={styles.titleAndDateWrapper}>
              <Text style={styles.titleText}>
                {state.data?.serviceProviderName || commonUtils.notAvailable}
              </Text>
              <Text style={styles.dateText}>
                {state?.data?.about || commonUtils.notAvailable}
              </Text>
            </View>

            <Image
              source={
                typeof state?.data?.image === "string"
                  ? { uri: state?.data?.image }
                  : ImagePicker.placeholderIMage
              }
              style={styles.imageWrapper}
            />

            <View>
              <Text style={styles.detailsText}>
                {commonUtils.serviesOfferd}
              </Text>
              <TextSpliter data={state?.data?.serviceOffer} />
            </View>

            <View style={styles.contactDetailsStyle}>
              <Text style={styles.detailsText}>
                {commonUtils.contactDetails}
              </Text>

              <View style={styles.contactInnerWrapper}>
                <View style={styles.iconBg}>
                  <Icon
                    name="phone"
                    color={pickColors.blackColor}
                    size={Responsive.font(5)}
                  />
                </View>
                <View style={styles.textBackground}>
                  <Text style={styles.textStyle}>
                    {state?.data?.contact
                      ? `+91-${state?.data?.contact}`
                      : commonUtils.notAvailable}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.contactInnerWrapper,
                  { paddingVertical: Responsive.heightPx(0.2) },
                ]}
              >
                <View style={styles.iconBg}>
                  <FeatherIcon
                    name="map-pin"
                    color={pickColors.blackColor}
                    size={Responsive.font(5)}
                  />
                </View>
                <View
                  style={[
                    styles.textBackground,
                    { height: "auto", paddingVertical: Responsive.heightPx(2) },
                  ]}
                >
                  <Text style={styles.textStyle}>
                    {state?.data?.address
                      ? `${state?.data?.address}`
                      : commonUtils.notAvailable}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ServiceProviderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
    paddingBottom: Responsive.heightPx(4),
  },
  headerDetails: {
    marginHorizontal: Responsive.widthPx(4.5),
    marginVertical: Responsive.heightPx(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Responsive.widthPx(80),
  },
  headerText: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(5),
    fontFamily: "Bold",
    textTransform: "uppercase",
  },

  mainWrapper: {
    marginHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(4),
  },
  titleAndDateWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
  },

  titleText: {
    fontFamily: "Bold",
    fontSize: Responsive.font(8),
  },
  dateText: {
    color: "grey",
    fontSize: Responsive.font(4),
    fontFamily: "Regular",
  },

  imageWrapper: {
    height: Responsive.heightPx(40),
    width: Responsive.widthPx(90),
    alignSelf: "center",
    marginVertical: Responsive.heightPx(4),
    borderRadius: 25,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: pickColors.inputFieldBg,
  },

  detailsText: {
    color: pickColors.blackColor,
    fontFamily: "Bold",
    fontSize: Responsive.font(4.5),
    marginBottom: Responsive.heightPx(1.5),
  },

  contactDetailsStyle: {
    marginTop: Responsive.heightPx(2.5),
  },

  contactInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(5),
    paddingVertical: Responsive.heightPx(3),
    paddingHorizontal: Responsive.widthPx(3),
  },

  iconBg: {
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(12),
    backgroundColor: pickColors.lightBrandColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  textBackground: {
    backgroundColor: pickColors.lightBrandColor,
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(60),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: Responsive.widthPx(4),
    borderRadius: 10,
  },
  textStyle: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
});
