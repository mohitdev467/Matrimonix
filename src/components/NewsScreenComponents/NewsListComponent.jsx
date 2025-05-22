import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { pickColors } from "../../helpers/theme/colors";
import { formattedDate } from "../../helpers/CommonFunctions/CommonFunctions";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";

const NewsListComponent = ({ newsData }) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainWrapper}>
        {newsData &&
          newsData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.innerWrapper}
                key={index}
                onPress={() =>
                  navigation.navigate(screenNames.NewsDetailsScreen, {
                    id: item._id,
                  })
                }
              >
                <View style={styles.leftWrapper}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <View style={styles.titleDescriptionWrapper}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.titleDescription}>
                      {item.description.length > 60
                        ? `${item.description.slice(0, 60)}...`
                        : item.description}
                    </Text>
                  </View>
                  <Text style={styles.createdAtStyle}>
                    {formattedDate(item.createdAt)}
                  </Text>
                </View>
                <View style={styles.rightWrapper}>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : ImagePicker.placeholderIMage
                    }
                    style={styles.imageWrapper}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default NewsListComponent;

const styles = StyleSheet.create({
  mainWrapper: {
    marginHorizontal: Responsive.widthPx(4),
    marginRight: Responsive.widthPx(6),
  },

  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Responsive.heightPx(1.5),
    borderBottomWidth: 1,
    borderBottomColor: pickColors.lightBrandColor,
    paddingBottom: Responsive.heightPx(2),
  },

  leftWrapper: {
    flexDirection: "column",
    gap: Responsive.heightPx(2),
  },
  imageWrapper: {
    height: Responsive.heightPx(10),
    width: Responsive.widthPx(20),
    borderRadius: 15,
  },
  titleDescriptionWrapper: {
    width: Responsive.widthPx(60),
    flexDirection: "column",
    gap: Responsive.heightPx(0.5),
  },
  titleDescription:{
    fontFamily: "Ubuntu-Regular",

  },
  categoryText: {
    textTransform: "capitalize",
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Bold",
  },

  titleText: {
    fontSize: Responsive.font(4.5),
    fontFamily: "Ubuntu-Medium",
    color: pickColors.brandColor,
  },
  createdAtStyle: {
    color: pickColors.lightGreyColor,
    fontFamily: "Regular",
  },
});
