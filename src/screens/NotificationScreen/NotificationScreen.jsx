import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { notificationData } from "../../constants/CommonData/CommonData";
import {
  formattedDate,
  truncateText,
} from "../../helpers/CommonFunctions/CommonFunctions";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.notifictionsText}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {notificationData &&
          notificationData?.map((item, index) => {
            return (
              <View style={styles.cardWrapper} key={index}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : ImagePicker.placeholderIMage
                    }
                    style={styles.imageStyle}
                  />
                  <View style={styles.iconAndDateWrapper}>
                    <Icon
                      name={"clock"}
                      color={pickColors.lightGreyColor}
                      style={styles.icon}
                    />
                    <Text style={styles.dateStyle}>
                      {formattedDate(item.createdAt)}
                    </Text>
                  </View>
                </View>

                <View style={styles.contentWrapper}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.descriptionText}>
                    {item.description.length > 90
                      ? `${item.description.slice(0, 90)}...`
                      : item.description}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  cardWrapper: {
    backgroundColor: pickColors.whiteColor,
    shadowColor: pickColors.blackColor,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    marginVertical: Responsive.heightPx(1.5),
    marginHorizontal: Responsive.widthPx(4.5),
    paddingLeft: Responsive.widthPx(4),

    justifyContent: "center",
  },

  imageWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Responsive.heightPx(2),
  },
  imageStyle: {
    height: Responsive.heightPx(7),
    width: Responsive.widthPx(14),
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: pickColors.whiteColor,
    borderWidth: 1,
  },
  iconAndDateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Responsive.widthPx(5),
    gap: Responsive.widthPx(1.5),
  },
  contentWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
    marginTop: Responsive.heightPx(1),
    paddingRight: Responsive.widthPx(4),
    marginBottom: Responsive.heightPx(2.2),
  },
  icon: {
    fontSize: Responsive.font(4),
  },
  dateStyle: {
    fontSize: Responsive.font(3.2),
    width: Responsive.widthPx(20),
    fontFamily: "Ubuntu-Regular",
  },
  nameText: {
    fontSize: Responsive.font(4.5),
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Medium",
  },
  descriptionText: {
    color: "grey",
    fontSize: Responsive.font(3.5),
    fontFamily: "Ubuntu-Regular",
    width: Responsive.widthPx(80),
  },
});
