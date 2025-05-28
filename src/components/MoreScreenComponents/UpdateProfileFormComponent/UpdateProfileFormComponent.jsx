import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInputField from "../../CommonComponents/CustomInputField";
import ButtonComponent from "../../CommonComponents/ButtonComponent";
import { commonUtils } from "../../../utilities/CommonUtils/CommonUtils";
import { pickColors } from "../../../helpers/theme/colors";
import Responsive from "../../../helpers/ResponsiveDimensions/Responsive";
// import FileUploader from "../../CommonComponents/FileUploader";
import PhoneNumberInput from "../../CommonComponents/PhoneInputComponent";
import SelectDropdown from "../../CommonComponents/SelectDropdown";
import {
  bodyTypeData,
  brothersSistersData,
  dietaryHabitsData,
  drinkingData,
  familyClassData,
  familyTypeData,
  genderData,
  manglikData,
  maritalStatusData,
  smokingData,
} from "../../../constants/CommonData/CommonData";
import useAuthStorage from "../../../helpers/Hooks/useAuthStorage";
import useEntities from "../../../helpers/Hooks/useEntities";
import { formatData } from "../../../helpers/CommonFunctions/CommonFunctions";

const UpdateProfileFormComponent = ({ handleUpdateData }) => {
  const { loginData } = useAuthStorage();
  const { data } = useEntities();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    country_code: "",
    mobile: null,
    about_me: "",
    image: null,
    address: "",
    city: "",
    district: "",
    state: "",
    pinCode: null,
    dob: "",
    birth_time: "",
    birth_place: "",
    marital_status: null,
    caste: "",
    height: "",
    weight: "",
    body_type: null,
    blood_group: "",
    gender: null,
    bodyType: "",
    special_case: "",
    qualification: "",
    occupation: "",
    drinking: "",
    dietary: "",
    smoking: "",
    languages: "",
    hobbies: "",
    family_status: "",
    family_type: "",
    income: "",
    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    brother: "",
    sister: "",
    family_city: "",
    family_district: "",
    gotra: "",
    gotra_nanihal: "",
    manglik: "",
    family_income: "",
    whatsapp_no:'',
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFile = (file) => {
    setFormState({ ...formState, image: file });
  };

  const handlePhoneNumber = (value) => {
    setFormState({ ...formState, mobile: value });
  };

  const handleSubmit = () => {
    handleUpdateData(formState);
  };
  useEffect(() => {
    if (loginData?.data) {
      setFormState((prevState) => ({
        ...prevState,
        ...loginData.data,
      }));
    }
  }, [loginData]);

  const formattedCasteData = formatData(data?.caste, "caste", "caste");
  const formattedIncomeData = formatData(data?.income, "income", "income");
  const formattedOccupationData = formatData(
    data?.occupation,
    "occupation",
    "occupation"
  );
  const formattedLanguageData = formatData(
    data?.language,
    "language",
    "language"
  );

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginInputWrapper}>
          {/* <FileUploader label="" onFileSelected={handleFile} /> */}

          <CustomInputField
            name="name"
            label="Full Name"
            value={formState.name}
            onTextChange={handleInputChange}
            placeholder="Enter full Name"
            error={errors.name}
            helperText={errors.name}
            containerStyle={styles.containerStyle}
            mainContainerStyle={styles.mainContainer}
            isRequired={true}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
          />
          <View>
            <CustomInputField
              name="email"
              label="Email"
              value={formState.email}
              onTextChange={handleInputChange}
              placeholder="Enter email"
              error={errors.email}
              helperText={errors.email}
              containerStyle={styles.containerStyle}
              isRequired={true}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <PhoneNumberInput
            onChangePhone={handlePhoneNumber}
            label={"Phone number"}
            exisitingPhoneNumber={formState.mobile}
            error={errors?.mobile}
            errorMessage={errors?.mobile}
            isRequired={true}
                        labelStyle={{color:pickColors.blackColor, marginLeft:Responsive.widthPx(3)}}
                        phoneContainer={styles.phoneContainer}
                        phoneContainerStyle={styles.phoneContainerStyle}
                        newCodeTextStyle={styles.newCodeTextStyle}
                        textContainerStyle={styles.textContainerStyle}
                        textInputStyleNew={styles.textInputStyleNew}
                        countryPickerStyle={styles.countryPickerStyle}
          />
          <View>
            <CustomInputField
              name="about_me"
              label="About Myself"
              value={formState.about_me}
              onTextChange={handleInputChange}
              placeholder="Enter about yourself"
              error={errors.about_me}
              helperText={errors.about_me}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="address"
              label="Address"
              value={formState.address}
              onTextChange={handleInputChange}
              placeholder="Enter address"
              error={errors.address}
              helperText={errors.address}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="city"
              label="City"
              value={formState.city}
              onTextChange={handleInputChange}
              placeholder="Enter city"
              error={errors.city}
              helperText={errors.city}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="district"
              label="District"
              value={formState.district}
              onTextChange={handleInputChange}
              placeholder="Enter district"
              error={errors.district}
              helperText={errors.district}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="pinCode"
              label="Pin Code"
              value={formState.pinCode}
              onTextChange={handleInputChange}
              placeholder="Enter pin"
              error={errors.pinCode}
              helperText={errors.pinCode}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="state"
              label="State"
              value={formState.state}
              onTextChange={handleInputChange}
              placeholder="Enter state"
              error={errors.state}
              helperText={errors.state}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="dob"
              label="Date of Birth"
              value={formState.dob}
              onTextChange={handleInputChange}
              placeholder="DD/MM/YYYY"
              error={errors.dob}
              helperText={errors.dob && commonUtils.DateofBirthRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="birth_time"
              label="Birth Time"
              value={formState.birth_time}
              onTextChange={handleInputChange}
              placeholder="Enter birth time"
              error={errors.birth_time}
              helperText={errors.birth_time && commonUtils.birthTimeRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="birth_place"
              label="Birth Place"
              value={formState.birth_place}
              onTextChange={handleInputChange}
              placeholder="Enter birth place"
              error={errors.birth_place}
              helperText={errors.birth_place && commonUtils.birthPlaceRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedCasteData || []}
              label="Caste"
              value={formState.caste}
              placeholder="Select caste"
              onChangeValue={(value) => handleInputChange("caste", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.caste}
              errorMessage={errors.caste}
            />
          </View>

          <View>
            <SelectDropdown
              options={bodyTypeData}
              label="Body Type"
              value={formState.body_type}
              placeholder="Select body type"
              onChangeValue={(value) => handleInputChange("body_type", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.marital_status}
              errorMessage={errors.marital_status}
            />
          </View>

          <View>
            <CustomInputField
              name="height"
              label="Height"
              value={formState.height}
              onTextChange={handleInputChange}
              placeholder="Enter height in (cm)"
              error={errors.height}
              helperText={errors.height}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="weight"
              label="Weight"
              value={formState.weight}
              onTextChange={handleInputChange}
              placeholder="Enter weight in (kg)"
              error={errors.weight}
              helperText={errors.weight}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="blood_group"
              label="Blood group"
              value={formState.blood_group}
              onTextChange={handleInputChange}
              placeholder="Enter blood group"
              error={errors.blood_group}
              helperText={errors.blood_group && commonUtils.bloodGroupRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={genderData}
              label="Gender"
              value={formState.gender}
              placeholder="Select gender"
              onChangeValue={(value) => handleInputChange("gender", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.gender}
              errorMessage={errors.gender}
            />
          </View>
          <View>
            <SelectDropdown
              options={maritalStatusData}
              label="Marital Status"
              value={formState.marital_status}
              placeholder="Select marital status"
              onChangeValue={(value) =>
                handleInputChange("marital_status", value)
              }
              dropdownStyle={styles.dropdownStyle}
              error={errors.marital_status}
              errorMessage={errors.marital_status}
            />
          </View>

          <View>
            <CustomInputField
              name="qualification"
              label="Education"
              value={formState.qualification}
              onTextChange={handleInputChange}
              placeholder="Enter education"
              error={errors.qualification}
              helperText={errors.qualification}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedOccupationData || []}
              label="Occupation"
              value={formState.occupation}
              placeholder="Select occupation"
              onChangeValue={(value) => handleInputChange("occupation", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.occupation}
              errorMessage={errors.occupation}
            />
          </View>
          <View>
            <SelectDropdown
              options={drinkingData}
              label={"Drinking Habits"}
              value={formState.drinking}
              placeholder={"Select drinking habits"}
              onChangeValue={(value) => handleInputChange("drinking", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.drinking}
              errorMessage={errors.drinking}
            />
          </View>
          <View>
            <SelectDropdown
              options={dietaryHabitsData}
              label={"Dietary Habits"}
              value={formState.dietary}
              placeholder={"Select dietary habits"}
              onChangeValue={(value) => handleInputChange("dietary", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.dietary}
              errorMessage={errors.dietary}
            />
          </View>
          <View>
            <SelectDropdown
              options={smokingData}
              label={"Smokin Habits"}
              value={formState.smoking}
              placeholder={"Select smoking habits"}
              onChangeValue={(value) => handleInputChange("smoking", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.smoking}
              errorMessage={errors.smoking}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedLanguageData || []}
              label="Language"
              value={formState.languages}
              placeholder="Select languages"
              onChangeValue={(value) => handleInputChange("languages", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.languages}
              errorMessage={errors.languages}
            />
          </View>

          <View>
            <CustomInputField
              name="hobbies"
              label="Hobbies"
              value={formState.hobbies}
              onTextChange={handleInputChange}
              placeholder="Enter hobbies"
              error={errors.hobbies}
              helperText={errors.hobbies}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={familyClassData}
              label={"Family Status"}
              value={formState.family_status}
              placeholder={"Select family status"}
              onChangeValue={(value) =>
                handleInputChange("family_status", value)
              }
              dropdownStyle={styles.dropdownStyle}
              error={errors.family_status}
              errorMessage={commonUtils.familyStatusRquired}
            />
          </View>
          <View>
            <SelectDropdown
              options={familyTypeData}
              label={"Family Type"}
              value={formState.family_type}
              placeholder={"Select family type"}
              onChangeValue={(value) => handleInputChange("family_type", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.family_type}
              errorMessage={commonUtils.familyTypeRquired}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedIncomeData || []}
              label="Annual Income (in Rs.)"
              value={formState.income}
              placeholder="Select income"
              onChangeValue={(value) => handleInputChange("income", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.income}
              errorMessage={errors.income}
            />
          </View>

          <View>
            <CustomInputField
              name="father_name"
              label="Father Name"
              value={formState.father_name}
              onTextChange={handleInputChange}
              placeholder="Enter father name"
              error={errors.father_name}
              helperText={errors.father_name && commonUtils.fatherNamerequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedOccupationData || []}
              label="Father Occupation"
              value={formState.father_occupation}
              placeholder="Select father occupation"
              onChangeValue={(value) =>
                handleInputChange("father_occupation", value)
              }
              dropdownStyle={styles.dropdownStyle}
              error={errors.father_occupation}
              errorMessage={
                errors.father_occupation && commonUtils.fatherOccupationrequired
              }
            />
          </View>

          <View>
            <CustomInputField
              name="mother_name"
              label="Mother Name"
              value={formState.mother_name}
              onTextChange={handleInputChange}
              placeholder="Enter mother name"
              error={errors.mother_name}
              helperText={errors.mother_name && commonUtils.motherNamerequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedOccupationData || []}
              label="Mother Occupation"
              value={formState.mother_occupation}
              placeholder="Select mother occupation"
              onChangeValue={(value) =>
                handleInputChange("mother_occupation", value)
              }
              dropdownStyle={styles.dropdownStyle}
              error={errors.mother_occupation}
              errorMessage={
                errors.mother_occupation && commonUtils.motherOccupationrequired
              }
            />
          </View>
          <View>
            <SelectDropdown
              options={brothersSistersData}
              label={"Brother's"}
              value={formState.brother}
              placeholder={"Select brother's"}
              onChangeValue={(value) => handleInputChange("brother", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.brother}
              errorMessage={errors.brother}
            />
          </View>
          <View>
            <SelectDropdown
              options={brothersSistersData}
              label={"Sister's"}
              value={formState.sister}
              placeholder={"Select sister's"}
              onChangeValue={(value) => handleInputChange("sister", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.sister}
              errorMessage={errors.sister}
            />
          </View>

          <View>
            <CustomInputField
              name="family_address"
              label="Family Address"
              value={formState.family_address}
              onTextChange={handleInputChange}
              placeholder="Enter family address"
              error={errors.family_address}
              helperText={
                errors.family_address && commonUtils.familyaddressRequired
              }
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="family_city"
              label="Family City"
              value={formState.family_city}
              onTextChange={handleInputChange}
              placeholder="Enter family city"
              error={errors.family_city}
              helperText={errors.family_city && commonUtils.familyCityRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="gotra"
              label="Gotra"
              value={formState.gotra}
              onTextChange={handleInputChange}
              placeholder="Enter gotra"
              error={errors.gotra}
              helperText={errors.gotra}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <CustomInputField
              name="gotra_nanihal"
              label="Gotra Nanihal"
              value={formState.gotra_nanihal}
              onTextChange={handleInputChange}
              placeholder="Enter gotra nanihal"
              error={errors.gotra_nanihal}
              helperText={errors.gotra && commonUtils.gotrananiHalRequired}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>
          <View>
            <SelectDropdown
              options={manglikData}
              label={"Manglik"}
              value={formState.manglik}
              placeholder={"Select manglik"}
              onChangeValue={(value) => handleInputChange("manglik", value)}
              dropdownStyle={styles.dropdownStyle}
              error={errors.manglik}
              errorMessage={errors.manglik}
            />
          </View>

          <View>
            <SelectDropdown
              options={formattedIncomeData || []}
              label="Family Income"
              value={formState.family_income}
              placeholder="Select family income"
              onChangeValue={(value) =>
                handleInputChange("family_income", value)
              }
              dropdownStyle={styles.dropdownStyle}
              error={errors.family_income}
              errorMessage={
                errors.family_income && commonUtils.familyIncomeRquired
              }
            />
          </View>

          <View>
            <CustomInputField
              name="whatsapp_no"
              label="Whatsapp Number"
              value={formState.whatsapp_no}
              onTextChange={handleInputChange}
              placeholder="Enter whatsapp number"
              error={errors.whatsapp_no}
              helperText={errors.whatsapp_no}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View>
            <CustomInputField
              name="aadhaar"
              label="Aadhar Number"
              value={formState.aadhaar}
              onTextChange={handleInputChange}
              placeholder="Enter aadhaar number"
              error={errors.aadhaar}
              helperText={errors.aadhaar}
              containerStyle={styles.containerStyle}
              mainContainerStyle={styles.mainContainer}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </View>


          <ButtonComponent
            title={commonUtils.updateProfileHeading}
            onPress={handleSubmit}
            style={styles.buttonStyle}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateProfileFormComponent;

const styles = StyleSheet.create({
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
  },

  containerStyle: {
    marginBottom: Responsive.heightPx(1),
    borderRadius: 20,
  },

  labelStyle: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(3.5),
    marginBottom: Responsive.heightPx(1),
    fontFamily:"Ubuntu-Medium",
    marginLeft: Responsive.widthPx(4),
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: Responsive.widthPx(4),
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
    color: pickColors.blackColor,
  },

  mainContainer: {
    backgroundColor: pickColors.whiteColor,
    width: Responsive.widthPx(85),
    height: Responsive.heightPx(5.5),
    alignSelf: "center",
    borderRadius: 10,
    borderWidth:1,
    borderColor:pickColors.blackColor
  },
  dropdownStyle: {
    width: Responsive.widthPx(85),
    height: Responsive.heightPx(5.5),
    alignSelf: "center",
    marginBottom: Responsive.heightPx(0),
    paddingVertical: Responsive.heightPx(1),
  },
  buttonStyle: {
    marginBottom: Responsive.heightPx(4),
    marginTop: Responsive.heightPx(4),
  },
 phoneContainerStyle: {
     backgroundColor: "#fff",
     borderWidth: 1,
     height: Responsive.heightPx(6.2),
     width: "90%",
     borderRadius:10,
     alignSelf:"center"
   },
 
   phoneContainer:{
     marginHorizontal:0,
   },
 
   textContainerStyle: {
     backgroundColor: "#fff",
     borderBottomWidth: 0.5,
     borderColor: pickColors.blackColor,
     paddingVertical: 0,
     borderRadius:10,
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
 
  
  mainContainerStyle:{
    borderWidth:1,
    borderColor: pickColors.blackColor,

  },
  newCodeTextStyle:{
    backgroundColor:pickColors.whiteColor
  },
   textInputStyleNew: {
      backgroundColor: "transparent",
      fontFamily: "Ubuntu-Medium",
      fontSize: Responsive.font(4),
      color: pickColors.blackColor,
    },
  
});
