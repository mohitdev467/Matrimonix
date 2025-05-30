import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Loader from "../../components/LoaderComponent/Loader";
import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
import {
  validateLoginForm,
  validatePasswordsOnly,
} from "../../utilities/Validations/Validations";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import Feather from "react-native-vector-icons/Feather";
import { handleUpdatePassword } from "../../services/AuthServices/AuthServices";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    password: "",
    loading: false,
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const updateStateData = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handlePasswordReset = async () => {
    if (!validatePasswordsOnly(state, setErrors)) {
      ErrorHandler(commonUtils.pleaseFillAllFields);
      return;
    }

    updateStateData("loading", true);
    const result = await handleUpdatePassword({
      password: state.password,
    });

    if (result?.data?.success) {
      successHandler(result.data.message);
      navigation.navigate(screenNames.LoginScreen);
      updateStateData("loading", false);
    } else {
      ErrorHandler(result.data?.message ?? commonUtils.unexpectedError);
      updateStateData("loading", false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={"Reset Password"}
        isBackHeader={true}
        isChatScreen={false}
        icon={"arrow-left"}
      />

      <View style={styles.formWrapper}>
        <Text style={styles.label}>
          New Password <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter new password"
          placeholderTextColor={pickColors.subHeadingColor}
          secureTextEntry={secureTextEntry}
          style={styles.inputStyle}
          onChangeText={(text) => updateStateData("password", text)}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordIconWrp}
        >
          <Feather
            name={!secureTextEntry ? "eye" : "eye-off"}
            size={20}
            color={pickColors.brandColor}
            style={{ paddingRight: 10 }}
          />
        </TouchableOpacity>
        {errors.password && (
          <View style={{ paddingLeft: Responsive.widthPx(5) }}>
            <Text style={styles.errorText}>{errors.password}</Text>
          </View>
        )}
      </View>

      <View>
        {state.loading ? (
          <Loader visible={state.loading} />
        ) : (
          <ButtonComponent
            title="Update Password"
            onPress={handlePasswordReset}
            style={styles.loginButtonStyle}
            textStyle={styles.buttonTextStyle}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  formWrapper: {
    marginHorizontal: Responsive.widthPx(5),
    marginVertical: Responsive.heightPx(4),
  },

  passwordIconWrp: {
    position: "absolute",
    right: 10,
    top: Responsive.heightPx(5),
  },
  label: {
    color: pickColors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
  subLabel: {
    color: pickColors.subHeadingColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.3),
  },

  inputStyle: {
    backgroundColor: pickColors.whiteColor,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: Responsive.heightPx(1),
    paddingHorizontal: Responsive.widthPx(3),
    height: Responsive.heightPx(6),
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
  },
  loginButtonStyle: {
    marginHorizontal: Responsive.widthPx(6),
    marginTop: Responsive.heightPx(0),
    borderRadius: 100,
    paddingVertical: Responsive.heightPx(1.5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pickColors.brandColor,
  },
  buttonTextStyle: {
    color: pickColors.whiteColor,
    fontFamily: "Bold",
    fontSize: Responsive.font(4.5),
  },
  errorText: {
    color: pickColors.errorColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.5),
    marginTop: Responsive.heightPx(1),
  },
});
