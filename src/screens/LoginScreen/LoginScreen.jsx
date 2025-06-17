import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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
import PhoneNumberInput from "../../components/CommonComponents/PhoneInputComponent";
import CustomInputField from "../../components/CommonComponents/CustomInputField";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  useBackHandler(true);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    country_code: "+91",
    mobile: "",
    password: "",
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
        navigation.navigate(screenNames.HomeScreen);
      } else {
        ErrorHandler(result?.error?.response?.data?.message ?? commonUtils.unexpectedError);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pickColors.whiteColor }}>
       <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} 
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
      <View>
        <View style={styles.imageLogoWrp}>
          <Image
            source={ImagePicker.loginScreenLogo2}
            tintColor={pickColors.brandColor}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.logoHeadings}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subTitle}>
            Enter your phone number and password below to get access!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputsWrapper}>
            <View style={styles.iconBg}>
              <Feather
                name="phone"
                size={Responsive.font(5)}
                color={pickColors.brandColor}
              />
            </View>

            <PhoneNumberInput
              label={"Phone number"}
              onChangePhone={(text) => {
                const match = text.match(/^\+(\d{1,4})/); 
                const countryCode = match ? `+${match[1]}` : "+91"; 
                const number = text.replace(/^\+\d{1,4}/, ''); 
              
                setFormData({ ...formData, mobile: number, country_code: countryCode });
              }}
              exisitingPhoneNumber={formData.mobile}
              isRequired={true}
              error={!!errors.mobile}
              errorMessage={errors.mobile}
              labelStyle={{color:pickColors.lightGreyColor}}
              phoneContainer={styles.phoneContainer}
              phoneContainerStyle={styles.phoneContainerStyle}
              newCodeTextStyle={styles.newCodeTextStyle}
              textContainerStyle={styles.textContainerStyle}
              textInputStyleNew={styles.textInputStyleNew}
              countryPickerStyle={styles.countryPickerStyle}
            />
          </View>
          <View style={styles.inputsWrapper}>
            <View style={styles.iconBg}>
              <Feather
                name="lock"
                size={Responsive.font(5)}
                color={pickColors.brandColor}
              />
            </View>
            <CustomInputField
              name="password"
              label="Password"
              value={formData.password}
              onTextChange={(name, text) =>
                setFormData({ ...formData, [name]: text })
              }
              placeholder="Enter your password"
              error={!!errors.password}
              helperText={errors.password}
              secureTextEntry={secureTextEntry}
              rightIcon={
                <Feather
                  name={!secureTextEntry ? "eye" : "eye-off"}
                  size={20}
                  color={pickColors.brandColor}
                />
              }
              onRightIconPress={togglePasswordVisibility}
              isRequired={true}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainerStyle}
              inputStyle={styles.textInputStyle}
            />


          </View>
        </View>
        
        <TouchableOpacity
          style={styles.forgotPasssWrp}
          onPress={() => navigation.navigate(screenNames.ForgotPassword)}
        >
          <Text
            style={{
              color: "grey",
              fontFamily: "Ubuntu-Medium",

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
      </ScrollView>
      </KeyboardAvoidingView>
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
    bottom: Responsive.heightPx(4),
    fontSize: Responsive.font(5.3),
    fontFamily: "Ubuntu-Bold",
    color: pickColors.headingColor,
  },
  subTitle: {
    bottom: Responsive.heightPx(2.3),
    fontSize: Responsive.font(3.5),
    paddingHorizontal: Responsive.widthPx(4),
    textAlign: "center",
    fontFamily: "Ubuntu-Medium",
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
    position:'relative',
    top:Responsive.heightPx(1.5)
  },
  textInputStyle: {
    flex: 1,
    marginHorizontal: Responsive.widthPx(2),
    backgroundColor: "transparent",
    fontFamily: "Ubuntu-Medium",
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
    gap: Responsive.widthPx(3)
  },

  loginButtonStyle: {
    marginHorizontal: Responsive.widthPx(6),
    marginTop: Responsive.heightPx(3),
    borderRadius: 100,
    paddingVertical: Responsive.heightPx(1.5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pickColors.brandColor,
  },
  textBttStyle: {
    color: pickColors.whiteColor,
    fontFamily: "Ubuntu-Medium",
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
    fontFamily: "Ubuntu-Regular",
  },
  registerText: {
    color: pickColors.brandColor,
    fontSize: Responsive.font(4),
    textDecorationLine: "underline",
    fontFamily: "Ubuntu-Medium",
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

  phoneContainerStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor:pickColors.brandColor,
    height: Responsive.heightPx(6.2),
    width: "87%",
    borderRadius:5,
  },

  phoneContainer:{
    marginHorizontal:0,
  },

  textContainerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: pickColors.brandColor,
    paddingVertical: 0,
  },

  textInputStyleNew: {
    backgroundColor: "transparent",
    fontFamily: "Ubuntu-Medium",
    fontSize: Responsive.font(4),
    color: pickColors.blackColor,
  },

  countryPickerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: pickColors.brandColor,
  },


  containerStyle: {
flex:1,

  },
  mainContainerStyle:{
    borderWidth:1,
    borderColor: pickColors.brandColor,

  },
  newCodeTextStyle:{
    backgroundColor:pickColors.whiteColor
  }

});
