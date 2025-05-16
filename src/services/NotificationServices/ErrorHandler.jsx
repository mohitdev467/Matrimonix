import { showMessage } from "react-native-flash-message";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const ErrorHandler = (error) => {
  const errorMessage = error?.response?.data?.message || error;

  showMessage({
    message: "Error",
    description: errorMessage,
    type: "danger",
    icon: "auto",
    duration: 3000,

    style: {
      backgroundColor: pickColors.errorColor,
      borderRadius: 10,
      padding: 15,
    },
    titleStyle: {
      fontSize: Responsive.font(4),
      fontFamily: "Bold",
      color: pickColors.whiteColor,
    },
    textStyle: {
      fontSize: Responsive.font(3.5),
      fontFamily: "Regular",
      color: pickColors.whiteColor,
    },
  });

  return Promise.reject(error);
};

export default ErrorHandler;
