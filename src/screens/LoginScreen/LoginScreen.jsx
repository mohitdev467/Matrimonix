import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  
  import { TextInput as PaperTextInput } from "react-native-paper";
  import Feather from "react-native-vector-icons/Feather";
  import { useNavigation } from "@react-navigation/native";
  import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
  import { pickColors } from "../../helpers/theme/colors";
  import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
  import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
  import {
    commonUtils,
    device_token,
  } from "../../utilities/CommonUtils/CommonUtils";
  import { validateLoginForm } from "../../utilities/Validations/Validations";
  import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
  import screenNames from "../../helpers/ScreenNames/ScreenNames";
  import Loader from "../../components/LoaderComponent/Loader";
  import { handleLoginUser } from "../../services/AuthServices/AuthServices";
  import successHandler from "../../services/NotificationServices/SuccessHandler";
  import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
  import useBackHandler from "../../helpers/Hooks/useBackHandler";
  
  export default function LoginScreen() {
    useBackHandler(true);
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      device_type: Platform.OS,
      device_token: device_token,
    });
    const [errors, setErrors] = useState({});
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { storeLoginData } = useAuthStorage();
  
    const togglePasswordVisibility = () => {
      setSecureTextEntry(!secureTextEntry);
    };
  
    const handleLogin = async () => {
      if (!validateLoginForm(formData, setErrors)) {
        ErrorHandler(commonUtils.pleaseFillAllFields);
        return;
      }
      try {
        setIsLoading(true);
        const result = await handleLoginUser(formData);
        if (result?.data?.success) {
          successHandler(commonUtils.loginSuccess);
          storeLoginData(result.data);
          setIsLoading(false);
          navigation.navigate(screenNames.MainTabs);
        } else {
          ErrorHandler(result.data?.message ?? commonUtils.unexpectedError);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: pickColors.whiteColor }}>
        <View>
          <View style={styles.imageLogoWrp}>
            <Image
              source={ImagePicker.loginScreenLogo}
              tintColor={pickColors.brandColor}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.logoHeadings}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subTitle}>
              Enter your email id and password below to get access!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputsWrapper}>
              <View style={styles.iconBg}>
                <Feather
                  name="mail"
                  size={Responsive.font(5)}
                  color={pickColors.brandColor}
                />
              </View>
              <PaperTextInput
                label="Email ID"
                mode="flat"
                value={formData.email}
                placeholderTextColor={pickColors.subHeadingColor}
                activeOutlineColor={pickColors.subHeadingColor}
                activeUnderlineColor={pickColors.brandColor}
                outlineColor={pickColors.brandColor}
                style={styles.textInputStyle}
                selectionColor={pickColors.subHeadingColor}
                textColor={pickColors.blackColor}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>
            {errors.email && (
              <View style={{ paddingLeft: Responsive.widthPx(15) }}>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
            <View style={styles.inputsWrapper}>
              <View style={styles.iconBg}>
                <Feather
                  name="lock"
                  size={Responsive.font(5)}
                  color={pickColors.brandColor}
                />
              </View>
              <PaperTextInput
                label="Password"
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                mode="flat"
                value={formData.password}
                placeholderTextColor={pickColors.subHeadingColor}
                activeOutlineColor={pickColors.brandColor}
                activeUnderlineColor={pickColors.brandColor}
                outlineColor={pickColors.subHeadingColor}
                style={styles.textInputStyle}
                secureTextEntry={secureTextEntry}
                selectionColor={pickColors.subHeadingColor}
                textColor={pickColors.blackColor}
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
            </View>
          </View>
          {formData?.password?.length > 0 ||
            (errors.password && (
              <View style={{ paddingLeft: Responsive.widthPx(15) }}>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            ))}
          <TouchableOpacity
            style={styles.forgotPasssWrp}
            onPress={() => navigation.navigate(screenNames.ForgotPassword)}
          >
            <Text
              style={{
                color: "grey",
                fontFamily: "SemiBold",
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
  
          <View>
            {isLoading ? (
              <Loader visible={isLoading} />
            ) : (
              <ButtonComponent
                title={"Login"}
                onPress={handleLogin}
                style={styles.loginButtonStyle}
                textStyle={styles.textBttStyle}
              />
            )}
          </View>
  
          <View style={styles.dontHaveAccountWrapper}>
            <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.SignUpScreen)}
            >
              <Text style={styles.registerText}>Register now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    imageLogoWrp: {
      height: Responsive.heightPx(22),
      width: Responsive.widthPx(44),
      alignSelf: "center",
      alignItems: "center",
    },
  
    welcomeText: {
      bottom: Responsive.heightPx(3),
      fontSize: Responsive.font(5.3),
      fontFamily: "Bold",
      color: pickColors.headingColor,
    },
    subTitle: {
      bottom: Responsive.heightPx(2.3),
      fontSize: Responsive.font(3.5),
      paddingHorizontal: Responsive.widthPx(4),
      textAlign: "center",
      fontFamily: "SemiBold",
      color: pickColors.subHeadingColor,
    },
    inputContainer: {
      flexDirection: "column",
      gap: Responsive.heightPx(1),
      marginTop: Responsive.heightPx(2.5),
    },
    logoImage: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
    },
    logoHeadings: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    iconBg: {
      height: Responsive.heightPx(4),
      width: Responsive.widthPx(8),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: pickColors.lightBrandColor,
      borderRadius: 100,
    },
    textInputStyle: {
      flex: 1,
      marginHorizontal: Responsive.widthPx(2),
      backgroundColor: "transparent",
      fontFamily: "Bold",
      height: Responsive.heightPx(7),
      color: pickColors.blackColor,
    },
    passwordIconWrp: {
      position: "absolute",
      right: Responsive.widthPx(2),
    },
  
    inputsWrapper: {
      marginHorizontal: Responsive.widthPx(5),
      flexDirection: "row",
      alignItems: "center",
    },
  
    loginButtonStyle: {
      marginHorizontal: Responsive.widthPx(6),
      marginTop: Responsive.heightPx(5),
      borderRadius: 100,
      paddingVertical: Responsive.heightPx(1.5),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: pickColors.brandColor,
    },
    textBttStyle: {
      color: pickColors.whiteColor,
      fontFamily: "Regular",
      fontSize: Responsive.font(4.2),
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: pickColors.subHeadingColor,
    },
    textBetweenLines: {
      fontSize: Responsive.font(3.8),
      marginHorizontal: Responsive.widthPx(1),
      color: pickColors.subHeadingColor,
      fontFamily: "SemiBold",
    },
  
    errorText: {
      color: pickColors.brandColor,
      fontSize: Responsive.font(3),
      fontFamily: "Regular",
    },
  
    dontHaveAccountWrapper: {
      marginTop: Responsive.heightPx(5),
      marginHorizontal: Responsive.widthPx(6),
      flexDirection: "row",
      gap: Responsive.widthPx(2),
      alignSelf: "center",
      alignItems: "center",
    },
  
    dontHaveAccountText: {
      color: pickColors.blackColor,
      fontSize: Responsive.font(4),
      fontFamily: "Regular",
    },
    registerText: {
      color: pickColors.brandColor,
      fontSize: Responsive.font(4),
      textDecorationLine: "underline",
      fontFamily: "SemiBold",
    },
  
    searchWrapper: {
      marginHorizontal: Responsive.widthPx(6),
      flexDirection: "row",
      gap: Responsive.widthPx(2),
      alignSelf: "center",
      alignItems: "center",
    },
    clickHereTo: {
      color: pickColors.blackColor,
      fontSize: Responsive.font(4),
      fontFamily: "Regular",
    },
  
    searchText: {
      color: pickColors.brandColor,
      fontSize: Responsive.font(4),
      textDecorationLine: "underline",
      fontFamily: "SemiBold",
    },
    forgotPasssWrp: {
      marginTop: Responsive.heightPx(2),
      marginHorizontal: Responsive.widthPx(6),
      alignItems: "flex-end",
    },
  });
  