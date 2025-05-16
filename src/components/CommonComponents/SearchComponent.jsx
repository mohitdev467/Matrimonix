import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { pickColors } from "../../helpers/theme/colors";

const SearchComponent = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={18} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: Responsive.heightPx(6),
    marginVertical: Responsive.heightPx(2),
    marginHorizontal: Responsive.widthPx(4),
    paddingHorizontal: Responsive.widthPx(5),
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Responsive.font(3.8),
    color: pickColors.blackColor,
  },
});
