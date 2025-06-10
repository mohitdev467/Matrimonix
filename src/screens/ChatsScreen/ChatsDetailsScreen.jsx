import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import io from "socket.io-client";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";


// MessageBubble Component with Date/Time
function MessageBubble({ userId, message, dateTime }) {
  const route = useRoute();
  const { loginData } = route.params || {};
  const isSender = userId === loginData?.data?._id;

  const istDateTime = new Date(dateTime).toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata", // Set timezone to IST
    // day: "2-digit",
    // month: "2-digit",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format (e.g., 03:30 PM)
  });

  return (
    <View style={{ alignItems: isSender ? "flex-end" : "flex-start", marginVertical: 5 }}>
      <View
        style={{
          maxWidth: "80%",
          borderRadius: 20,
          padding: 10,
          backgroundColor: isSender ? pickColors.brandColor : "#F3F2F2", // Red for sender, gray for receiver
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: isSender ? "#fff" : "#000", // White text for sender, black for receiver
            fontSize: Responsive.font(3.5),
          }}
        >
          {message}
        </Text>
        <Text
        allowFontScaling={false}
        style={{
          color: isSender ? "#fff" : "#000",
          fontSize: Responsive.font(2.5),
          marginTop: 2,
        }}
      >
       {istDateTime}
      </Text>
      </View>
      
    </View>
  );
}

const ChatsDetailsScreen = () => {
  const socket = io("http://143.110.243.199:5001");
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { loginData } = route.params || {};
  const detailss = route.params.data;
  const [chat, setChat] = useState({});
  const [allChat, setAllChat] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");

  const handleMessageUpdate = (data,joinData) => {
    setAllChat(data);
    setLoading(false);
  };

  useEffect(() => {
    if (allChat && Array.isArray(allChat)) {
      let selectedChat = allChat.find((item) => item._id === chat?._id);
      setCurrentChat(selectedChat?.messages);
    }
  }, [allChat]);

  useEffect(() => {
    if (detailss) {
      setLoading(true);
      socket.on("allMessages-in-app", (data) => {
        handleMessageUpdate(data, chat);
      });
      socket.emit(
        "join-in-app-chat",
        { userId: loginData?.data?._id, receiverId: detailss },
        (joinData) => {
          if (joinData.error) {
            alert(joinData.error);
          }
          setChat(joinData);
          socket.emit(
            "fetch-all-in-app-messages",
            { userId: loginData?.data?._id },
            (data) => 
              {
                handleMessageUpdate(data, joinData)
              }
          );
        }
      );
    }
  }, [route.params]);

  const sendMessage = async (chat) => {
    socket.emit(
      "sendMessage-in-app-chat",
      {
        message,
        senderId: loginData?.data?._id,
        receiverId: detailss,
      },
      (data) => {
        console.log(data, " <==  I am data...");
      }
    );
    setMessage("");
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff", // White background
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
            <Icon name={"arrow-left"} style={styles.icon} />
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "Roboto-Bold",
            fontSize: 20,
            color: "#000", // Black text for the chat name
          }}
        >
          {detailss?.name || "Chat"}
        </Text>
      </View>

      {/* Chat Messages */}
      <View style={styles.container}>
        <FlatList
          data={currentChat}
          renderItem={({ item }) => <MessageBubble {...item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            gap: 10,
            paddingBottom: 70, // Space for input field
          }}
          automaticallyAdjustKeyboardInsets
        />

        {/* Input Field and Send Button */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <View style={styles.inputContainer}>
            <TextInput
              allowFontScaling={false}
              style={styles.input}
              placeholderTextColor="#888"
              placeholder="Type a message..."
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity onPress={() => sendMessage(chat)} style={styles.sendButton}>
              <Feather name="send" size={Responsive.widthPx(5)} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ChatsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: Responsive.heightPx(6),
    borderRadius: 20,
    paddingHorizontal: Responsive.widthPx(4),
    backgroundColor: "#E5E5E5", // Gray background for input
    color: "#000",
    fontSize: Responsive.font(3.6),
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: pickColors.brandColor, // Red send button
    borderRadius: 50,
    padding: Responsive.widthPx(2.5),
    justifyContent: "center",
    alignItems: "center",
  },
    icon: {
      fontSize: Responsive.font(5.5),
    },
});
