import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";

const SliderComponent = ({ homeSliderData }) => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        paginationStyle={styles.pagination}
      >
        {homeSliderData.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: Responsive.heightPx(30),
    width: Responsive.widthPx(92),
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: Responsive.heightPx(1),
  },

  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  pagination: {
    position: "absolute",
    bottom: Responsive.heightPx(-3),
  },
  dotStyle: {
    backgroundColor: pickColors.inputFieldBg,
    width: Responsive.widthPx(2.4),
    height: Responsive.heightPx(1.2),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: pickColors.brandColor,
    width: Responsive.widthPx(2.4),
    height: Responsive.heightPx(1.2),
    borderRadius: 6,
  },
});

export default SliderComponent;
