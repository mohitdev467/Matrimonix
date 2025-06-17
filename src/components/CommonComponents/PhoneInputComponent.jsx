import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const PhoneNumberInput = ({
  onChangePhone,
  label,
  labelStyle,
  error,
  existingPhoneNumber = "",
  errorMessage,
  phoneContainerStyle,
  textContainerStyle,
  textInputStyleNew,
  countryPickerStyle,
  isRequired = false,
  phoneContainer,
  newCodeTextStyle,
}) => {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(existingPhoneNumber || "");
  const [formattedValue, setFormattedValue] = useState("");

  // Clean the phone number to remove country code or non-numeric characters
  const cleanPhoneNumber = (number) => {
    if (!number) return "";
    // Convert to string and remove non-numeric characters
    const cleaned = number.toString().replace(/\D/g, "");
    // Remove country code (e.g., '91' for India) if present
    return cleaned.startsWith("91") ? cleaned.substring(2) : cleaned;
  };

  useEffect(() => {
    console.log("Existing Phone Number:", existingPhoneNumber);
    const cleanedNumber = cleanPhoneNumber(existingPhoneNumber);
    console.log("Cleaned Phone Number:", cleanedNumber);
    setPhoneNumber(cleanedNumber);

    // Explicitly update PhoneInput's internal state
    if (phoneInputRef.current && cleanedNumber) {
      phoneInputRef.current.setState({ number: cleanedNumber });
    }
  }, [existingPhoneNumber]);

  return (
    <View style={[styles.container, phoneContainer]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {isRequired && <Text style={{ color: "red" }}>*</Text>} {label} 
        </Text>
      )}
      <PhoneInput
        ref={phoneInputRef}
        value={phoneNumber} // Controlled input
        defaultCode="IN"
        layout="second"
        onChangeText={(text) => {
          console.log("OnChangeText:", text);
          setPhoneNumber(text);
          onChangePhone(text);
        }}
        onChangeFormattedText={(text) => {
          console.log("Formatted Text:", text);
          setFormattedValue(text);
        }}
        placeholder="Enter phone number"
        containerStyle={[styles.phoneContainer, phoneContainerStyle]}
        textContainerStyle={[styles.textContainer, textContainerStyle]}
        textInputStyle={[styles.textInputStyle, textInputStyleNew]}
        codeTextStyle={[styles.codeTextStyle, newCodeTextStyle]}
        countryPickerButtonStyle={[styles.countryPickerStyle, countryPickerStyle]}
        textInputProps={{
          placeholderTextColor: "grey",
          maxLength: 10, // Restrict to 10 digits for Indian numbers
        }}
      />
      {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "101%",
    marginVertical: Responsive.heightPx(1.3),
    marginHorizontal: Responsive.widthPx(4),
  },
  label: {
    fontSize: Responsive.font(3.8),
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Medium",
    marginBottom: Responsive.heightPx(0.5),
  },
  phoneContainer: {
    backgroundColor: pickColors.inputFieldBg,
    borderRadius: 10,
    marginTop: Responsive.heightPx(0.5),
    paddingHorizontal: Responsive.widthPx(2),
    height: Responsive.heightPx(6),
    fontSize: Responsive.font(4.2),
    fontFamily: "Ubuntu-Medium",
    alignSelf: "flex-start",
    width: Responsive.widthPx(90),
  },
  textInputStyle: {
    backgroundColor: pickColors.inputFieldBg,
    fontFamily: "Ubuntu-Medium",
    color: pickColors.blackColor,
    fontSize: Responsive.font(4),
  },
  codeTextStyle: {
    backgroundColor: pickColors.inputFieldBg,
    fontFamily: "Ubuntu-Medium",
  },
  textContainer: {
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: pickColors.inputFieldBg,
    fontFamily: "Ubuntu-Medium",
  },
  errorText: {
    color: "red",
    marginTop: Responsive.heightPx(1),
    fontSize: Responsive.font(3),
  },
});

export default PhoneNumberInput;
