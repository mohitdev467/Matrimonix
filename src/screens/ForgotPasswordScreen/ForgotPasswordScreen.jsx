import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { pickColors } from "../../helpers/theme/colors";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Loader from "../../components/LoaderComponent/Loader";
import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
import {
  validateEmailOnly,
} from "../../utilities/Validations/Validations";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import {
  handleForgotPassword,
} from "../../services/AuthServices/AuthServices";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: "",
    loading: false,
    search: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleNext = async () => {
    if (!validateEmailOnly(state, setErrors)) {
      ErrorHandler(commonUtils.pleaseFillAllFields);
      return;
    }
    updateStateData("loading", true);
    const result = await handleForgotPassword({ email: state.email });
    console.log("resulttt", result);
    if (result?.data?.success) {
      navigation.navigate(screenNames.ResetPassword);
      updateStateData("loading", false);
    } else {
      ErrorHandler(result.data?.message ?? commonUtils.unexpectedError);
      updateStateData("loading", false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={"Forgot Password"}
        isBackHeader={true}
        isChatScreen={false}
        icon={"arrow-left"}
      />

      <View style={styles.formWrapper}>
        <Text style={styles.label}>
          Enter Email <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={pickColors.subHeadingColor}
          style={styles.inputStyle}
          onChangeText={(text) => updateStateData("email", text)}
        />
        {errors.email && (
          <View style={{ paddingLeft: Responsive.widthPx(5) }}>
            <Text style={styles.errorText}>{`*${errors.email}`}</Text>
          </View>
        )}
      </View>

      <View>
        {state.loading ? (
          <Loader visible={state.loading} />
        ) : (
          <ButtonComponent
            title="Next"
            onPress={handleNext}
            style={styles.loginButtonStyle}
            textStyle={styles.buttonTextStyle}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  formWrapper: {
    marginHorizontal: Responsive.widthPx(5),
    marginVertical: Responsive.heightPx(4),
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
