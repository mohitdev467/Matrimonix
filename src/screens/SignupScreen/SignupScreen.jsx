import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { pickColors } from "../../helpers/theme/colors";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import ButtonComponent from "../../components/CommonComponents/ButtonComponent";
import { validateSignUpForm } from "../../utilities/Validations/Validations";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { handleRegisterUser } from "../../services/AuthServices/AuthServices";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import Feather from "react-native-vector-icons/Feather";
import Loader from "../../components/LoaderComponent/Loader";
import PhoneNumberInput from "../../components/CommonComponents/PhoneInputComponent";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import SelectDropdown from "../../components/CommonComponents/SelectDropdown";
import {
  genderData,
} from "../../constants/CommonData/CommonData";
import useCityAndStates from "../../helpers/Hooks/useCityAndStates";
import { SafeAreaView } from "react-native-safe-area-context";
import useOccupations from "../../helpers/Hooks/useOccupoations";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: "",
    country_code: "+91",
    mobile: "",
    gender: "",
    family_type: null,
    city: "",
    state: "",
    occupation: "",
  });
  const { storeLoginData } = useAuthStorage();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] =
    useState(true);
  const [errors, setErrors] = useState({});
  const { cities, states, fetchCities } = useCityAndStates();
  const { occupations } = useOccupations();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const togglePasswordVisibilityConfirmPassword = () => {
    setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
  };

  const handleSignup = async () => {
    if (!validateSignUpForm(formData, setErrors)) {
      ErrorHandler(commonUtils.pleaseFillAllFields);
      return;
    }
    try {
      setIsLoading(true);
      const result = await handleRegisterUser(formData);
      if (result.success) {
        successHandler(commonUtils.userCreatedSuccess);
        storeLoginData(result.data);
        navigation.navigate(screenNames.LoginScreen);
      } else {
        ErrorHandler(result.error ?? commonUtils.unexpectedError);
      }
    } catch (error) {
      console.log("Error in register user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value, fieldName) => {
    if (fieldName === 'state') {
      const selectedState = formattedStatesOptions.find(
        (option) => option.value === value
      );
      const stateName = selectedState ? selectedState.label : value;

      setFormData({ ...formData, [fieldName]: stateName });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: null,
      }));

      if (stateName) {
        fetchCities('India', stateName); 
        setFormData((prev) => ({ ...prev, city: '' })); 
      }
    } else {
      setFormData({ ...formData, [fieldName]: value });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: null,
      }));
    }
  };




  const handlePhoneNumber = (value) => {
    setFormData({ ...formData, mobile: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      mobile: "",
    }));
  };


const formattedCitiesOptions = cities?.data?.map((item) => ({
  label: item,
  value: item?.toLowerCase()?.replace(/\s+/g, "_"), 
}));

  const formattedStatesOptions = states?.data?.map((item) => ({
    label: item?.name,
    value: item?.name?.toLowerCase()?.replace(/\s+/g, "_"),
  }));

  const formattedOccupationsOptions = occupations?.data?.map((item) => ({
    label: item?.occupation,
    value: item?.occupation?.toLowerCase()?.replace(/\s+/g, "_"),
  }));


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pickColors.whiteColor }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.imageLogoWrp}>
            <Image
              source={ImagePicker.loginScreenLogo2}
              tintColor={pickColors.brandColor}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.logoHeadings}>
            <Text style={styles.createAccountText}>Create Account</Text>
            <Text style={styles.registerWithEmailId}>
              Register with valid email id
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formWrapper}>
              <Text style={styles.label}>
                First Name <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter first name"
                placeholderTextColor={pickColors.subHeadingColor}
                style={styles.inputStyle}
                onChangeText={(text) => handleChange(text, "firstName")}
              />
            </View>
            {errors.firstName && (
              <View style={{ paddingLeft: Responsive.widthPx(5) }}>
                <Text style={styles.errorText}>{errors.firstName}</Text>
              </View>
            )}

<View style={styles.formWrapper}>
              <Text style={styles.label}>
                Last Name <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter last name"
                placeholderTextColor={pickColors.subHeadingColor}
                style={styles.inputStyle}
                onChangeText={(text) => handleChange(text, "lastName")}
              />
            </View>
            {errors.lastName && (
              <View style={{ paddingLeft: Responsive.widthPx(5) }}>
                <Text style={styles.errorText}>{errors.lastName}</Text>
              </View>
            )}
            <View style={styles.formWrapper}>
              <Text style={styles.label}>
                Email ID <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor={pickColors.subHeadingColor}
                style={styles.inputStyle}
                onChangeText={(text) => handleChange(text, "email")}
              />
            </View>
            {errors.email && (
              <View style={{ paddingLeft: Responsive.widthPx(5) }}>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
            <PhoneNumberInput
              onChangePhone={handlePhoneNumber}
              label={"Phone number"}
              isRequired={true}
              error={errors?.mobile}
              errorMessage={errors?.mobile}
              labelStyle={{
                color: pickColors.blackColor,
                marginLeft: Responsive.widthPx(5),
              }}
              phoneContainer={styles.phoneContainer}
              phoneContainerStyle={styles.phoneContainerStyle}
              newCodeTextStyle={styles.newCodeTextStyle}
              textContainerStyle={styles.textContainerStyle}
              textInputStyleNew={styles.textInputStyleNew}
              countryPickerStyle={styles.countryPickerStyle}
              errorMessageStyle={{
                color: 'orange',
                fontSize: Responsive.font(3.3),
                fontFamily: "bold",
              }}
            />

<View style={styles.formWrapper}>
            <Text style={styles.label}>
              Gender <Text style={{ color: "red" }}>*</Text>
            </Text>
            <SelectDropdown
              options={genderData}
              label=""
              value={formData.gender}
              placeholder="Select gender"
              onChangeValue={(value) => handleChange(value, "gender")}
              dropdownStyle={styles.dropdownStyle}
              dropdownContainerStyle={styles.dropdownContainerStyle}
              error={errors.gender}
              errorMessage={errors.gender}
            />
          </View>
            <View style={styles.formWrapper}>
              <Text style={styles.label}>
                Password <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor={pickColors.subHeadingColor}
                secureTextEntry={secureTextEntry}
                style={styles.inputStyle}
                onChangeText={(text) => handleChange(text, "password")}
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
            {errors.password && (
              <View style={{ paddingLeft: Responsive.widthPx(5) }}>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}
            <View style={styles.formWrapper}>
              <Text style={styles.label}>
                Confirm Password <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor={pickColors.subHeadingColor}
                style={styles.inputStyle}
                secureTextEntry={secureTextEntryConfirmPassword}
                onChangeText={(text) => handleChange(text, "confirmPassword")}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibilityConfirmPassword}
                style={styles.passwordIconWrp}
              >
                <Feather
                  name={!secureTextEntryConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color={pickColors.brandColor}
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <View style={{ paddingLeft: Responsive.widthPx(5) }}>
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              </View>
            )}
          </View>


          <View style={styles.formWrapper}>
            <Text style={styles.label}>
              Occupations <Text style={{ color: "red" }}>*</Text>
            </Text>
            <SelectDropdown
              options={formattedOccupationsOptions}
              value={formData.occupation}
              placeholder="Select Occupation"
              onChangeValue={(value) => handleChange(value, "occupation")}
              dropdownStyle={styles.dropdownStyle}
              dropdownContainerStyle={styles.dropdownContainerStyle}
              error={errors.occupation}
              errorMessage={errors.occupation}
            />
          </View>

         


          <View style={styles.formWrapper}>
            <Text style={styles.label}>
              State <Text style={{ color: "red" }}>*</Text>
            </Text>
            <SelectDropdown
              options={formattedStatesOptions}
              value={
                formattedStatesOptions.find((option) => option.label === formData.state)?.value || ''
              }
              placeholder="Select State"
              onChangeValue={(value) => handleChange(value, "state")}
              dropdownStyle={styles.dropdownStyle}
              dropdownContainerStyle={styles.dropdownContainerStyle}
              error={errors.state}
              errorMessage={errors.state}
            />
          </View>

          <View style={styles.formWrapper}>
            <Text style={styles.label}>
              City <Text style={{ color: "red" }}>*</Text>
            </Text>
            <SelectDropdown
              options={formattedCitiesOptions}
              value={formData.city}
              placeholder="Select City"
              onChangeValue={(value) => handleChange(value, "city")}
              dropdownStyle={styles.dropdownStyle}
              dropdownContainerStyle={styles.dropdownContainerStyle}
              error={errors.city}
              errorMessage={errors.city}
            />
          </View>





          
          

          <View>
            {isLoading ? (
              <Loader visible={isLoading} />
            ) : (
              <ButtonComponent
                title="Register"
                onPress={handleSignup}
                style={styles.loginButtonStyle}
                textStyle={styles.buttonTextStyle}
              />
            )}
          </View>

          <View style={styles.alreadyHaveAccountWrappaer}>
            <Text style={styles.alreadyHaveAccount}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.LoginScreen)}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageLogoWrp: {
    height: Responsive.heightPx(20),
    width: Responsive.widthPx(40),
    alignSelf: "center",
    alignItems: "center",
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

  loginButtonStyle: {
    marginHorizontal: Responsive.widthPx(6),
    marginTop: Responsive.heightPx(2),
    borderRadius: 100,
    paddingVertical: Responsive.heightPx(1.5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pickColors.brandColor,
  },

  formWrapper: {
    marginVertical: Responsive.heightPx(1.3),
    marginHorizontal: Responsive.widthPx(5),
    position: "relative",
  },
  passwordIconWrp: {
    position: "absolute",
    right: 0,
    top: Responsive.heightPx(5),
  },
  label: {
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Medium",
    fontSize: Responsive.font(4),
  },
  subLabel: {
    color: pickColors.subHeadingColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(3.3),
  },

  inputStyle: {
    backgroundColor: pickColors.whiteColor,
    borderRadius: 10,
    marginTop: Responsive.heightPx(1),
    paddingHorizontal: Responsive.widthPx(3),
    height: Responsive.heightPx(6),
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Medium",
    color: pickColors.blackColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: pickColors.brandColor,
    fontSize: Responsive.font(3.3),
    fontFamily: "Medium",
  },

  createAccountText: {
    bottom: Responsive.heightPx(3),
    fontSize: Responsive.font(5.5),
    fontFamily: "Ubuntu-Bold",
    color: pickColors.headingColor,
  },
  registerWithEmailId: {
    bottom: Responsive.heightPx(2.3),
    fontSize: Responsive.font(3.4),
    color: pickColors.subHeadingColor,
    fontFamily: "Ubuntu-Medium",
  },
  signInButtonText: {
    color: pickColors.brandColor,
    fontSize: Responsive.font(4.2),
    textDecorationLine: "underline",
    fontFamily: "Ubuntu-Medium",
  },
  alreadyHaveAccount: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4.2),
    fontFamily: "Ubuntu-Regular",
  },
  buttonTextStyle: {
    color: pickColors.whiteColor,
    fontFamily: "Ubuntu-Medium",
    fontSize: Responsive.font(4.5),
  },
  alreadyHaveAccountWrappaer: {
    marginTop: Responsive.heightPx(2),
    marginBottom: Responsive.heightPx(5),
    marginHorizontal: Responsive.widthPx(6),
    flexDirection: "row",
    gap: Responsive.widthPx(2),
    alignSelf: "center",
    alignItems: "center",
  },

  dropdownStyle: {
    borderRadius: 5,
    height: Responsive.heightPx(6),
  },
  phoneContainerStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    height: Responsive.heightPx(6.2),
    width: "87%",
    borderRadius: 5,
    alignSelf: "center"
  },

  phoneContainer: {
    marginHorizontal: 0,
  },

  textContainerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: pickColors.blackColor,
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
    borderColor: pickColors.blackColor,
  },
  newCodeTextStyle: {
    backgroundColor: pickColors.whiteColor
  }
});
