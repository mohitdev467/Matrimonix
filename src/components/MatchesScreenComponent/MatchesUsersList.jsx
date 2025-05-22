import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { handleAddUserShortlist } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import useShortlistUser from "../../helpers/Hooks/useShortlistUser";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.75;
const ITEM_SPACING = (width - ITEM_WIDTH) / 3;

const SliderItem = ({ item }) => {
  const navigation = useNavigation();
  const { loginData, updateLoginData } = useAuthStorage();
  const { shortlistData } = useShortlistUser();

  const [state, setState] = useState({
    isShortlistingWorking: false,
    isShortlisted: false,
  });

  const updateStateData = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShortlist = async (userId) => {
    try {
      updateStateData("isShortlistingWorking", true);
      const result = await handleAddUserShortlist(
        item?._id,
        loginData?.data?._id
      );
      if (result?.success) {
        updateStateData("isShortlisted", result?.data?.isShortlist);
        updateLoginData({ shortListedUserId: userId });
        successHandler(result?.data?.message);
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      updateStateData("isShortlistingWorking", false);
    }
  };

  useEffect(() => {
    if (shortlistData && item._id) {
      const isUserShortlisted = shortlistData.some(
        (shortlisted) => shortlisted.userId === item._id
      );
      updateStateData("isShortlisted", isUserShortlisted);
    }
  }, [shortlistData]);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(screenNames.DetailsScreen, {
            id: item._id,
          })
        }
      >
        <Image
          source={
            typeof item.image === "string"
              ? { uri: item.image }
              : item.gender === "male"
              ? ImagePicker.dummyUserMale
              : ImagePicker.dummyUserGirl
          }
          style={styles.image}
        />

        <View style={styles.innerContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.nameStyle}>{item.name}</Text>
            <Text
              style={[
                styles.nameStyle,
                { fontSize: Responsive.font(4), fontFamily: "Ubuntu-Regular",marginVertical:Responsive.heightPx(0.5) },
              ]}
            >
              {item.email}
            </Text>
            <Text
              style={[
                styles.nameStyle,
                { fontSize: Responsive.font(4), fontFamily: "Ubuntu-Regular",marginVertical:Responsive.heightPx(0.5) },
              ]}
            >
              {item.occupation}
            </Text>
          </View>

          {state.isShortlistingWorking ? (
            <ActivityIndicator size="large" color={pickColors.brandColor} />
          ) : (
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() => handleShortlist(item._id)}
            >
              <Icon
                name="heart"
                size={24}
                style={[
                  styles.icon,
                  {
                    color: state?.isShortlisted
                      ? pickColors.brandColor
                      : pickColors.blackColor,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

     
    </View>
  );
};

const MatchesUsersList = ({ matchedData }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={matchedData}
        renderItem={({ item }) => <SliderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={ITEM_WIDTH + Responsive.widthPx(6)}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      />
    </View>
  );
};

export default MatchesUsersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Responsive.widthPx(1),
    marginVertical: Responsive.heightPx(2),
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
    marginTop:Responsive.heightPx(4)
  },
  image: {
    width: "100%",
    height: Responsive.heightPx(48),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "contain",
  },
  innerContainer: {
    padding: Responsive.widthPx(4),
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  iconWrapper: {
    alignSelf: "flex-end",
    padding: Responsive.widthPx(3.5),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: Responsive.font(7),
  },
  contentWrapper: {
    alignItems: "flex-start",
    marginTop: Responsive.heightPx(1),
  },
  nameStyle: {
    color: "black",
    fontFamily:"Ubuntu-Medium",
    fontSize: Responsive.font(6.5),
    letterSpacing: 1.5,
  },
  percentWrapper: {
    flexDirection: "row",
    width: Responsive.widthPx(54),
    backgroundColor: pickColors.whiteColor,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(2),
    borderRadius: 15,
    gap: Responsive.widthPx(4),
    marginVertical: Responsive.heightPx(2),
    alignItems: "center",
  },
  percentWrapperINner: {
    borderWidth: 1,
    borderColor: pickColors.brandColor,
    borderRadius: 10,
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(0.9),
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    color: pickColors.brandColor,
    fontFamily: "Bold",
    fontSize: Responsive.font(4.3),
  },
  matchProfile: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.8),
  },
  yourProfile: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.8),
  },
});
