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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (text) => {
    if (onTextChange) {
      onTextChange(name, text);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, containerStyle]}
    >
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
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
    color:pickColors.lightGreyColor,
    fontFamily:"Ubuntu-Medium"
  },
  inputWrapperFocused: {
    borderColor: pickColors.blueColorText,
  },

  textInput: {
    flex: 1,
    fontSize: Responsive.font(4),
    color: pickColors.blackColor,
    fontFamily:"Ubuntu-Medium"
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
    fontFamily:"Ubuntu-Regular"
  },
  helperTextError: {
    color: pickColors.errorColor,
  },
  errorBorder: { borderColor: "red", borderWidth: 1 },
});

export default CustomInputField;
