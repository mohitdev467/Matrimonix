import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import FeatherIcon from "react-native-vector-icons/FontAwesome";

const SelectDropdown = ({
  options,
  value,
  label,
  onChangeValue,
  labelStyle,
  placeholder = "Select an option",
  dropdownStyle,
  dropdownContainerStyle,
  error,
  errorMessage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        style={[styles.dropdown, dropdownStyle, error && styles.errorBorder]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          {value
            ? options.find((item) => item.value === value)?.label
            : placeholder}
        </Text>

        <FeatherIcon name="chevron-down" style={styles.iconStyle} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.dropdownContainer, dropdownContainerStyle]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChangeValue(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Responsive.heightPx(1.5),
    backgroundColor: pickColors.creamColor,
  },
  dropdown: {
    borderColor: pickColors.inputFieldBg,
    borderRadius: 50,
    backgroundColor: pickColors.inputFieldBg,
    paddingVertical: Responsive.heightPx(0),
    paddingHorizontal: Responsive.widthPx(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    backgroundColor: pickColors.inputFieldBg,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    top: "40%",
    maxHeight: Responsive.heightPx(40),
  },
  textStyle: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
    color: pickColors.blackColor,
  },
  label: {
    color: pickColors.blackColor,
    marginLeft: Responsive.widthPx(5),
    fontFamily: "SemiBold",
    marginBottom: Responsive.heightPx(0.3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: pickColors.blackColor,
  },
  optionText: {
    fontSize: Responsive.font(3.5),
    color: pickColors.blackColor,
  },
  errorText: { color: "red", marginTop: 5, fontFamily: "Regular" },
  errorBorder: { borderColor: "red", borderWidth: 1 },
  iconStyle: {
    fontSize: Responsive.font(3.5),
    color: "grey",
  },
});

export default SelectDropdown;
