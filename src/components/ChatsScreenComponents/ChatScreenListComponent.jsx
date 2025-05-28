import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { createConversation } from "../../services/CommonServices/CommonServices";

const ChatScreenListComponents = ({ usersData }) => {
  const navigation = useNavigation();

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (usersData?.length > 0) {
      fetchConversations();
    }
  }, [usersData]);


  const fetchConversations = async () => {
    try {
      const userIds = usersData.map((user) => user._id);
      const newConversations = await createConversation(userIds);
      if (newConversations) {
        setConversations(newConversations);
      } else {
        Alert.alert("Error", "Failed to fetch conversations");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <View style={styles.mainWrapper}>
        {usersData &&
          usersData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.innerWrapper}
                onPress={() =>
                  navigation.navigate(screenNames.ChatsDetailsScreen, {
                    data: item,
                  })
                }
              >
                <View>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : ImagePicker.placeholderIMage
                    }
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.nameTimeAndDescWrapper}>
                  <View style={styles.nameAndTimeWrapper}>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <Text style={styles.dateStyle}>
                      {formattedDate(item.createdAt)}
                    </Text>
                  </View>
                  <Text style={styles.descriptionText}>{item?.email}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
};

export default ChatScreenListComponents;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
    marginVertical: Responsive.heightPx(1.5),
  },

  imageStyle: {
    height: Responsive.heightPx(8),
    width: Responsive.widthPx(16),
    borderRadius: 100,
    resizeMode: "cover",
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(1.5),
    paddingLeft: Responsive.widthPx(2),
    borderBottomWidth: 1,
    borderBottomColor: pickColors.inputFieldBg,
  },
  nameAndTimeWrapper: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameTimeAndDescWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(0.6),
  },
  nameStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Medium",
    paddingHorizontal: Responsive.widthPx(2),
  },
  dateStyle: {
    fontFamily: "Ubuntu-Regular",
    fontSize: Responsive.font(3.2),
  },
  descriptionText: {
    width: Responsive.widthPx(75),
    paddingHorizontal: Responsive.widthPx(2),
    color: "grey",
    fontFamily: "Ubuntu-Regular",

  },
});
