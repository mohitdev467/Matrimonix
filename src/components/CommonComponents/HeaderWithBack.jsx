import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import useGoBack from "../../helpers/Hooks/useGoBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";

const HeaderWithSearchBack = ({
  headerTitle,
  isBackHeader,
  icon,
  isChatScreen = false,
  handleStartCall
}) => {
  const goBack = useGoBack();
  const navigation = useNavigation();
  return (
    <View style={styles.headerMainWrapper}>
      {isBackHeader ? (
        <View style={styles.headerContainerForBack}>
          <TouchableOpacity onPress={goBack}>
            <Icon name={icon} style={styles.icon} />
          </TouchableOpacity>

          {isChatScreen ? (
            <View
              style={[
                styles.headerText,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                },
              ]}
            >
              <View>
                <Text style={styles.title}>{headerTitle}</Text>
                <Text style={styles.subTitle}>{commonUtils.lastSeenToday}</Text>
              </View>
              <View style={styles.iconStyles}>
                <Icon
                  name={"phone"}
                  style={[
                    styles.icon,
                    {
                      fontSize: Responsive.font(6.5),
                      color: pickColors.blackColor,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={handleStartCall}
                >
                  <Image
                    source={ImagePicker.videoCallImage}
                    style={styles.videoCallStyle}
                    tintColor={pickColors.blackColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.headerText}>
              <Text style={styles.title}>{headerTitle}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{headerTitle}</Text>
          <TouchableOpacity>
            <Icon name={icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderWithSearchBack;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: Responsive.widthPx(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
  },
  headerContainerForBack: {
    paddingHorizontal: Responsive.widthPx(4),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
    gap: Responsive.widthPx(8),
  },

  title: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.5),
  },
  icon: {
    fontSize: Responsive.font(5.5),
  },
  headerText: {
    flexDirection: "column",
  },
  subTitle: {
    fontSize: Responsive.font(3),
    color: pickColors.brandColor,
  },
  iconStyles: {
    flexDirection: "row",
    gap: Responsive.widthPx(5),
    alignItems: "center",
  },
  videoCallStyle: {
    height: Responsive.heightPx(3),
    width: Responsive.widthPx(6),
    resizeMode: "contain",
  },
});
