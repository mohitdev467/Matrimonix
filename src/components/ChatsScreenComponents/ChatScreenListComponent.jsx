import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import { createConversation } from "../../services/CommonServices/CommonServices";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.1.4:5000"; 

const ChatScreenListComponents = ({ usersData,loginData ,allChat}) => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [userStatus, setUserStatus] = useState({}); 
  const socketRef = useRef();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    if (usersData?.length > 0) {
      usersData.forEach((user) => {
        socket.emit("register", user._id);
      });
    }

    socket.on("user_status", ({ userId, online }) => {
      setUserStatus((prev) => ({
        ...prev,
        [userId]: online,
      }));
    });

    if (usersData?.length > 0) {
      fetchConversations();
    }

    return () => {
      socket.disconnect();
    };
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
        {allChat &&
          allChat?.map((item, index) => {
            const lastMessage = item?.messages?.length > 0 ? item.messages[item.messages.length - 1].message : "No messages";
            const lastMessageDate = item?.messages?.length > 0 
        ? formattedDate(item.messages[item.messages.length - 1].dateTime) 
        : formattedDate(item.createdAt);
            return (
              <TouchableOpacity
                style={styles.innerWrapper}
                onPress={() =>
                  navigation.navigate(screenNames.ChatsDetailsScreen, {
                    data: item.otherUser,
                    loginData: loginData,
                  })
                }
              >
                <View>
                  <Image
                    source={
                      typeof item?.otherUser?.image === "string"
                        ? { uri: item?.otherUser?.image }
                        : ImagePicker.placeholderIMage
                    }
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.nameTimeAndDescWrapper}>
                  <View style={styles.nameAndTimeWrapper}>
                    <Text style={styles.nameStyle}>{item?.otherUser?.name}</Text>
                    <Text style={styles.dateStyle}>
                      {lastMessageDate || "Just now"}
                    </Text>
                  </View>
                  <Text style={styles.descriptionText}>{lastMessage}</Text>
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
  imageContainer: {
    position: "relative",
  },
  imageStyle: {
    height: Responsive.heightPx(8),
    width: Responsive.widthPx(16),
    borderRadius: 100,
    resizeMode: "cover",
  },
  statusDot: {
    width: Responsive.widthPx(3),
    height: Responsive.widthPx(3),
    borderRadius: Responsive.widthPx(1.5),
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: pickColors.whiteColor,
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