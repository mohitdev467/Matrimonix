import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    Regular: require("../../assets/fonts/Ubuntu-Regular.ttf"),
    Bold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Light: require("../../assets/fonts/Ubuntu-Light.ttf"),
    SemiBold: require("../../assets/fonts/Ubuntu-Medium.ttf"),
  });
