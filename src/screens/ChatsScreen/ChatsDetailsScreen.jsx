import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { useRoute, useNavigation } from "@react-navigation/native";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { createMessages } from "../../services/CommonServices/CommonServices";
import useGetMessages from "../../helpers/Hooks/useGetMessages";
import Loader from "../../components/LoaderComponent/Loader";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import Feather from "react-native-vector-icons/Feather";
import io from "socket.io-client";
import screenNames from "../../helpers/ScreenNames/ScreenNames";

const SOCKET_SERVER_URL = "http://192.168.1.4:5000"; // <-- Change to your IP/server

const ChatsDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { data } = route.params || {};
  const { loginData } = useAuthStorage();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const { messages, isLoading, error, setMessages } = useGetMessages(data._id);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    socket.on("message_status", (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? { ...msg, status: updatedMessage.status } : msg
        )
      );
    });

    

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const tempId = Date.now();
    const newMessage = {
      id: tempId,
      message,
      image,
      senderId: loginData?.data?._id,
      status: "sending",
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    socketRef.current.emit("send_message", newMessage);
    setMessage("");

    try {
      const response = await createMessages({
        conversationId: data._id,
        senderId: loginData?.data?._id,
        message: message,
      });
      if (response.data.success) {
        const savedMessage = response.data;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id
              ? { ...savedMessage, sender: true, status: "sent" }
              : msg
          )
        );
        socketRef.current.emit("send_message", savedMessage);
      }
    } catch (error) {
      console.error("Message send error:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleStartCall = () => {
    const roomId = `${Date.now()}`;
    socketRef.current.emit("start_call", {
      senderId: loginData?.data?._id,
      receiverId: data._id,
      senderName: loginData?.data?.name,
      roomId,
    });

    navigation.navigate(screenNames.CallPageScreen, {
      roomId,
      isCaller: true,
    });
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId == loginData?.data._id ? styles.sent : styles.received,
      ]}
    >
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      {item.message && <Text style={styles.messageText}>{item.message}</Text>}
      <View style={styles.meta}>
        <Text style={styles.statusText}>{formattedDate(item.createdAt)}</Text>
        {item.senderId == loginData?.data._id && (
          <Text style={styles.statusText}>✓✓</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={data.name}
        isBackHeader={true}
        isChatScreen={false}
        icon={"arrow-left"}
        onVideoCallPress={handleStartCall} // Add this to the header
      />
      <View style={styles.horizontalLine}></View>
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item?._id?.toString()}
          style={styles.messageList}
        />
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Feather
            name="image"
            size={Responsive.widthPx(7)}
            color={pickColors.blackColor}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor={pickColors.blackColor}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Feather name="send" size={Responsive.widthPx(5)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatsDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: pickColors.whiteColor },
  horizontalLine: {
    height: Responsive.heightPx(0.1),
    backgroundColor: pickColors.inputFieldBg,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: Responsive.widthPx(2),
    paddingBottom: Responsive.heightPx(6),
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: pickColors.blackColor,
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: pickColors.brandColor,
    padding: Responsive.heightPx(1.1),
    paddingHorizontal: Responsive.widthPx(3),
  },
  messageText: {
    color: "white",
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1),
  },
  statusText: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3),
    marginTop: Responsive.heightPx(1),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
    paddingHorizontal: Responsive.widthPx(4),
    borderTopWidth: 1,
    borderTopColor: pickColors.lightGreyColor,
  },
  input: {
    flex: 1,
    height: Responsive.heightPx(6),
    borderRadius: 20,
    paddingHorizontal: Responsive.widthPx(4),
    backgroundColor: pickColors.inputFieldBg,
    color: pickColors.blackColor,
    fontSize: Responsive.font(3.6),
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: pickColors.brandColor,
    borderRadius: 100,
    paddingHorizontal: Responsive.widthPx(3.2),
    paddingVertical: Responsive.heightPx(1.6),
  },
  icon: {
    marginRight: 10,
  },
  image: {
    width: Responsive.widthPx(20),
    height: Responsive.heightPx(10),
    borderRadius: 10,
    marginBottom: Responsive.heightPx(1.1),
  },
  iconClock: {
    color: pickColors.whiteColor,
  },
});
