import { commonUtils } from "../CommonUtils/CommonUtils";
import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9][0-9]{9}$/;

const validateEmail = (email) => emailRegex.test(email);
const validatePhone = (phone) => phoneRegex.test(phone);

const validatePassword = (password) =>
  password.length >= 6 && password.length <= 10;

// const validatePassword = (password) => {
// const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

export const validateLoginForm = (formData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!formData.mobile.trim()) {
    errors.mobile = commonUtils.phoneRequired;
    isValid = false;
  } else if (!validatePhone(formData.mobile)) {
    errors.mobile = commonUtils.validPhoneNumber;
    isValid = false;
  }
  if (!formData.password.trim()) {
    errors.password = commonUtils.passwordRequired;
    isValid = false;
  } else if (!validatePassword(formData.password)) {
    errors.password = commonUtils.validPassword;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const validateSignUpForm = (formData, setErrors) => {
  let errors = {};
  let isValid = true;

  if (!formData.firstName.trim()) {
    errors.firstName = commonUtils.firstNameRequired;
    isValid = false;
  }
  if (!formData.lastName.trim()) {
    errors.lastName = commonUtils.lastNameRequired;
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = commonUtils.emailRequired;
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = commonUtils.validEmail;
    isValid = false;
  }

  if (!formData.mobile.trim()) {
    errors.mobile = commonUtils.phoneRequired;
    isValid = false;
  } else if (!validatePhone(formData.mobile)) {
    errors.mobile = commonUtils.validPhoneNumber;
    isValid = false;
  }

  if (!formData.password.trim()) {
    errors.password = commonUtils.passwordRequired;
    isValid = false;
  } else if (!validatePassword(formData.password)) {
    errors.password = commonUtils.validPassword;
    isValid = false;
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = commonUtils.confirmPasswordRequired;
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  } else if (!validatePassword(formData.confirmPassword)) {
    errors.confirmPassword = commonUtils.confirmValidPassword;
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

export const validateUserProfileForm = (formState) => {
  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/; // Allow only alphabets and spaces

  Object.keys(formState).forEach((field) => {
    if (!formState[field]) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    } else {
      if (field === "email" && !emailRegex.test(formState[field])) {
        errors.email = "Invalid email format";
      }
      if (field === "name" && !nameRegex.test(formState[field])) {
        errors.name = "Name should only contain alphabets";
      }
    }
  });

  return errors;
};

export const validateEmailOnly = (formData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!formData.email.trim()) {
    errors.email = commonUtils.emailRequired;
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = commonUtils.validEmail;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
export const validatePasswordsOnly = (formData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!formData.password.trim()) {
    errors.password = commonUtils.passwordRequired;
    isValid = false;
  } else if (!validatePassword(formData.password)) {
    errors.password = commonUtils.validPassword;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
