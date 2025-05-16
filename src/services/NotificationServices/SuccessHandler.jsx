import { showMessage } from "react-native-flash-message";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const successHandler = (response, position = "top") => {
  const successMessage = response?.data?.message || response;

  showMessage({
    message: "Success",
    description: successMessage,
    type: "success",
    icon: "auto",
    duration: 3000,
    position: position,

    style: {
      backgroundColor: pickColors.successColor,
      borderRadius: 5,
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
};

export default successHandler;
