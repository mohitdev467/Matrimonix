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
  
  // Clean the phone number and remove country code if present
  const cleanPhoneNumber = (number) => {
    if (!number) return "";
    // Remove any non-numeric characters
    const cleaned = number.toString().replace(/\D/g, '');
    // Remove country code (91) if present at the start
    return cleaned.startsWith('91') ? cleaned.substring(2) : cleaned;
  };

  const [phoneNumber, setPhoneNumber] = useState(cleanPhoneNumber(existingPhoneNumber));

  useEffect(() => {
    const cleaned = cleanPhoneNumber(existingPhoneNumber);
    setPhoneNumber(cleaned);
  }, [existingPhoneNumber]);

  const handleChangeText = (text) => {
    setPhoneNumber(text);
    onChangePhone(text);
  };

  return (
    <View style={[styles.container, phoneContainer]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <PhoneInput
        ref={phoneInputRef}
        value={phoneNumber}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="second"
        onChangeText={handleChangeText}
        onChangeFormattedText={(text) => {
          // Handle formatted text if needed
        }}
        placeholder="Enter phone number"
        containerStyle={[styles.phoneContainer, phoneContainerStyle]}
        textContainerStyle={[styles.textContainer, textContainerStyle]}
        textInputStyle={[styles.textInputStyle, textInputStyleNew]}
        codeTextStyle={[styles.codeTextStyle, newCodeTextStyle]}
        countryPickerButtonStyle={[styles.countryPickerStyle, countryPickerStyle]}
        textInputProps={{
          placeholderTextColor: 'grey',
          maxLength: 10, // Ensure maximum length for Indian phone numbers
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
    marginTop: Responsive.heightPx(1),
    color: pickColors.brandColor,
    fontSize: Responsive.font(3.3),
    marginLeft:Responsive.heightPx(2.5)

  },
});

export default PhoneNumberInput;
