import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getNewsById } from "../../services/NewsServices/NewsServices";
import Loader from "../../components/LoaderComponent/Loader";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";

const NewsDetailsScreen = () => {
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
      const result = await getNewsById(id);
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
      {state?.loading ? (
        <Loader visible={state.loading} />
      ) : (
        <View style={styles.mainWrapper}>
          <View style={styles.titleAndDateWrapper}>
            <Text style={styles.titleText}>
              {state.data?.title || commonUtils.notAvailable}
            </Text>
            <Text style={styles.dateText}>
              {formattedDate(state?.data?.createdAt) ||
                commonUtils.notAvailable}
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

          <View style={styles.descriptionWrapper}>
            <Text style={styles.descText}>
              {state?.data?.description || commonUtils.notAvailable}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  headerDetails: {
    marginHorizontal: Responsive.widthPx(4.5),
    marginVertical: Responsive.heightPx(2),
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(6),
    width: Responsive.widthPx(80),
  },
  headerText: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(5),
    fontFamily: "Ubuntu-Medium",
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
    fontFamily: "Ubuntu-Bold",
    fontSize: Responsive.font(8),
  },
  dateText: {
    color: "grey",
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Regular",
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

  descText: {
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Regular",
    textAlign: "justify",
  },
});
