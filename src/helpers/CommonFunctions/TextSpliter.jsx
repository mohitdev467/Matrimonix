import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Responsive from "../ResponsiveDimensions/Responsive";
import { pickColors } from "../theme/colors";

const TextSpliter = ({ data }) => {
  const services = data?.split(",").map((item) => item.trim());

  return (
    <View style={styles.container}>
      {services &&
        services?.map((service, index) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Responsive.widthPx(3),
    marginVertical: Responsive.heightPx(1),
  },
  serviceTag: {
    backgroundColor: pickColors.brandColor,
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(1.2),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    minWidth: Responsive.widthPx(30),
  },
  serviceText: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3.5),
    fontFamily: "Ubuntu-Medium",
  },
});

export default TextSpliter;
