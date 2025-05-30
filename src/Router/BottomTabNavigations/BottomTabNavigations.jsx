import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import _ from "lodash";
import {  pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

import Icon from "react-native-vector-icons/Feather";
import { BottomTabsUtils } from "../../utilities/BottomTabUtils/BottomTabUtils";
import { TextSemiBold } from "../../components/CommonComponents/CustomText";

const BottomTabNavigations = ({ props }) => {
  const onPressDrawer = (key) => {
    props?.navigation?.jumpTo(key);
  };

  return (
    <View>
      <View style={styles.container}>
        {BottomTabsUtils &&
          BottomTabsUtils.map((item, index) => {
            const isFocused = props.state.index === index;

            return (
              <TouchableOpacity
                style={styles.container1}
                onPress={() => onPressDrawer(item.key)}
                key={`tab-${index}`}
              >
                <View style={styles.imageView}>
                  {isFocused && <View style={styles.topBorder}></View>}

                  <Icon
                    name={item.icon}
                    style={styles.personImage}
                    color={
                      isFocused ? pickColors.brandColor : pickColors.blackColor
                    }
                  />
                </View>
                <TextSemiBold
                  style={[
                    styles.chatText,
                    {
                      color: isFocused
                        ? pickColors.brandColor
                        : pickColors.blackColor,
                    },
                  ]}
                >
                  {item.name}
                </TextSemiBold>
              </TouchableOpacity>
            );
          })}
      </View>
      <SafeAreaView style={styles.backgroundColor} />
    </View>
  );
};

export default BottomTabNavigations;

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.05,
  },
  backgroundColor: {
    backgroundColor: pickColors.whiteColor,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: pickColors.whiteColor,
    elevation: 10,
    shadowColor: pickColors.blackColor,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: Responsive.heightPx(1.5),
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    fontSize: Responsive.font(3.5),
    fontFamily:"Ubuntu-Medium",
  },
  imageView: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  personImage: {
    fontSize: Responsive.font(6),
    paddingTop: Responsive.heightPx(1),
  },

  topBorder: {
    position: "absolute",
    height: Responsive.heightPx(1),
    backgroundColor: pickColors.primary,
    width: Responsive.widthPx(10),
    borderRadius: 10,
    top: -4,
    zIndex: 99,
  },
});
