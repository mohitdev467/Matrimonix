import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { min } from "moment";

const CustomInputField = ({
  name,
  label,
  value,
  onTextChange,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  helperTextStyle,
  onLeftIconPress,
  isRequired = false,
  mainContainerStyle,
  secureTextEntry,
  onRightIconPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const numericFieldsConfig = {
    pinCode: { keyboardType: "number-pad", maxLength: 6 },
    age: { keyboardType: "number-pad", maxLength: 3 },
    dob: { keyboardType: "number-pad", maxLength: 10 },
    height: { keyboardType: "number-pad", maxLength: 3 },
    weight: { keyboardType: "number-pad", maxLength: 3 },
    income: { keyboardType: "number-pad", maxLength: 7, minLength: 5 },
    family_income: { keyboardType: "number-pad", maxLength: 7, minLength: 5 },
    aadhaar: { keyboardType: "number-pad", maxLength: 12 },
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (text) => {
    if (numericFieldsConfig[name]) {
      const numericText = text.replace(/[^0-9]/g, "");
      let errorMessage = "";

      if (name === "dob" && processedText.length <= 8) {
        let formattedText = "";
        if (processedText.length > 0) {
          formattedText = processedText.slice(0, 2);
          if (processedText.length >= 3) {
            formattedText = `${formattedText}/${processedText.slice(2, 4)}`;
            if (processedText.length >= 5) {
              formattedText = `${formattedText}/${processedText.slice(4, 8)}`;
            }
          }
        }
        processedText = formattedText;
      }

      if (name === "aadhaar" && numericText.length > 0) {
        const aadhaarRegex = /^[2-9][0-9]{11}$/;
        if (numericText.length === 12 && !aadhaarRegex.test(numericText)) {
          errorMessage = "Invalid Aadhaar number (12 digits, cannot start with 0 or 1)";
        } else if (numericText.length > 12) {
          errorMessage = "Aadhaar number must be exactly 12 digits";
          processedText = numericText.slice(0, 12);
        }
      }

      if (onTextChange) {
        onTextChange(name, numericText);
      }
    } else {
      if (onTextChange) {
        onTextChange(name, text);
      }
    }
  };

  const { keyboardType = "default", maxLength = undefined } =
    numericFieldsConfig[name] || {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, containerStyle]}
    >
      {label && (
        <Text style={[styles.label, labelStyle]}>
         {isRequired && <Text style={{ color: "red" }}>*</Text>} {label} 
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.errorBorder,
          mainContainerStyle,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          style={[styles.textInput, inputStyle]}
          placeholderTextColor={"grey"}
          keyboardType={keyboardType}
          maxLength={maxLength}
        // onFieldPress={name === "dob" ? () => setShowDatePicker(true) : null} // Trigger date picker on field tap

        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            activeOpacity={onRightIconPress ? 0.7 : 1}
            style={styles.iconContainer}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {helperText && (
        <Text
          style={[
            styles.helperText,
            error ? styles.helperTextError : {},
            helperTextStyle,
          ]}
        >
          {helperText}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Responsive.heightPx(1),
  },
  label: {
    fontSize: Responsive.font(4),
    color: pickColors.lightGreyColor,
    fontFamily: "Ubuntu-Medium",
    marginBottom: Responsive.heightPx(0.5),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: pickColors.borderColor,
    backgroundColor: pickColors.whiteColor,
    borderRadius: Responsive.widthPx(2),
    paddingHorizontal: Responsive.widthPx(2),
    height: Responsive.heightPx(6.3),
    color: pickColors.lightGreyColor,
    fontFamily: "Ubuntu-Medium",
  },
  inputWrapperFocused: {
    borderColor: pickColors.blueColorText,
  },
  textInput: {
    flex: 1,
    fontSize: Responsive.font(4),
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Medium",
  },
  iconContainer: {
    marginHorizontal: Responsive.widthPx(1.5),
    position: "relative",
    bottom: Responsive.heightPx(0.3),
  },
  helperText: {
    marginTop: Responsive.heightPx(0.5),
    fontSize: Responsive.font(3),
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Regular",
  },
  helperTextError: {
    color: pickColors.errorColor,
  },
  errorBorder: { borderColor: "red", borderWidth: 1 },
});

export default CustomInputField;
