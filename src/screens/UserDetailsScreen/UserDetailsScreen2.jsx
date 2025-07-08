import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import {
    getUserDetailsById,
    handleAddUserShortlist,
} from "../../services/UserServices/UserServices";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { pickColors } from "../../helpers/theme/colors";
import UserOverviewSection from "../../components/UsersDetailsScreenComponents/UserOverviewSection";
import UserLifestyleSection from "../../components/UsersDetailsScreenComponents/UserLifestyleSection";
import UserFamilySection from "../../components/UsersDetailsScreenComponents/UserFamilySection";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import Loader from "../../components/LoaderComponent/Loader";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import useShortlistUser from "../../helpers/Hooks/useShortlistUser";
import { BlurView } from "@react-native-community/blur";
import FeatherIcon from "react-native-vector-icons/Feather";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalDetailsScreen from "../../components/UsersDetailsScreenComponents/PersonalDetailsSection";

const tabs = [
    { key: "about", label: "PERSONAL DETAILS", image: require("../../assets/Images/about-myself.png") },
    { key: "overview", label: "KUNDLI & ASTRO DETAILS",image:ImagePicker.astroIcon },
    { key: "lifestyle", label: "LIFESTYLE & ADDRESS DETAILS", image:ImagePicker.lifestyleIcon },
    { key: "family", label: "FAMILY DETAILS", image:ImagePicker.familyIcon },
];

const UserDetailsScreen2 = () => {
    const goBack = useGoBack();
    const route = useRoute();
    const navigation = useNavigation()
    const { loginData, updateLoginData } = useAuthStorage();
    const { id } = route.params || {};
    const { shortlistData } = useShortlistUser();
    const { data: userData, refetch } = useUserDetailsById(loginData?.data?._id);
    const [activeTab, setActiveTab] = useState("about");


    const [state, setState] = useState({
        data: null,
        loading: false,
        refreshing: false,
        isShortlisted: false,
        isShortlistingWorking: false,
    });

    const updateState = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchUserDetailsById = async () => {
        updateState("loading", true);
        try {
            const result = await getUserDetailsById(id);
            if (result?.success) {
                updateState("data", result?.data || []);
            }
        } catch (error) {
            console.error(commonUtils.errorFetchingData, error);
        } finally {
            updateState("loading", false);
        }
    };

    const handleShortlist = async (userId) => {
        try {
            updateState("isShortlistingWorking", true);
            const result = await handleAddUserShortlist(userId, loginData?.data?._id);
            if (result?.success) {
                updateState("isShortlisted", result?.data?.isShortlist);
                updateLoginData({ shortListedUserId: userId });
                successHandler(result?.data?.message);
            }
        } catch (error) {
            console.error(commonUtils.errorFetchingData, error);
        } finally {
            updateState("isShortlistingWorking", false);
        }
    };

    useEffect(() => {
        updateState("loading", true);
        fetchUserDetailsById(id);
    }, [id]);

    useEffect(() => {
        if (shortlistData && id) {
            const isUserShortlisted = shortlistData.some(
                (item) => item.userId === state?.data?._id
            );
            setState((prevState) => ({
                ...prevState,
                isShortlisted: isUserShortlisted,
            }));
        }
    }, [shortlistData, state?.data?._id]);


    useFocusEffect(
        useCallback(() => {
            if (loginData?.data?._id) {
                refetch();
            }
        }, [loginData?.data?._id])
    );


    const isExpired = userData?.membershipStatus === "expired";

    const renderTabContent = () => {
        switch (activeTab) {
            case "about":
                return (
                    <>
                        <Text style={styles.sectionText}>
                            {
                                `${commonUtils.aboutMySelf}`
                                || commonUtils.notAvailable}
                        </Text>
                        <View style={{ marginVertical: Responsive.heightPx(2) }}>
                            <Text style={{ fontSize: Responsive.font(4.5), fontFamily: "Ubuntu-Bold" }}>Basic Information:</Text>
                        </View>
                        <PersonalDetailsScreen myDetails={state?.data} />
                    </>
                );
            case "overview":
                return <UserOverviewSection myDetails={state?.data} />;
            case "lifestyle":
                return <UserLifestyleSection myDetails={state?.data} />;
            case "family":
                return <UserFamilySection myDetails={state?.data} />;
            default:
                return null;
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: pickColors.whiteColor }}>
                {state?.loading ? (
                    <Loader visible={state.loading} />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainWrappper}>
                            <View>
                                <View style={styles.imageWrapper}>
                                    <Icon
                                        name="arrow-left"
                                        color={pickColors.blackColor}
                                        size={Responsive.font(6)}
                                        onPress={goBack}
                                        style={styles.goBackButton}
                                    />
                                    <Image
                                        source={
                                            state?.data?.image
                                                ? { uri: state.data.image }
                                                : ImagePicker.placeholderIMage
                                        }
                                        style={[styles.imageWrapperMain, { resizeMode: 'cover' }]}
                                    />
                                    <View style={styles.imageContent}>
                                        <View style={{ flexDirection: "column", gap: Responsive.heightPx(1) }}>
                                            <Text
                                                style={[
                                                    styles.textStyle,
                                                    { fontFamily: "Ubuntu-Bold", fontSize: Responsive.font(5) },
                                                ]}
                                            >
                                                {state?.data?.firstName
                                                    ? `${state?.data?.firstName} ${state?.data?.lastName}`
                                                    : commonUtils.notAvailable}
                                            </Text>
                                            <View style={{ flexDirection: "row", gap: Responsive.widthPx(1) }}>
                                                <Text
                                                    style={[
                                                        styles.textStyle,
                                                        { fontSize: Responsive.font(3.7) },
                                                    ]}
                                                >
                                                    {state?.data?.age
                                                        ? `Age: ${state?.data?.age}`
                                                        : commonUtils.notAvailable}
                                                </Text>
                                                <Text style={{ color: pickColors.whiteColor }}>|</Text>
                                                <Text
                                                    style={[
                                                        styles.textStyle,
                                                        { fontSize: Responsive.font(3.7) },
                                                    ]}
                                                >
                                                    {state?.data?.occupation
                                                        ? state?.data?.occupation
                                                        : commonUtils.notAvailable}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.featureIconsWrapper}>
                                            <View style={styles.chatWrapper}>
                                                <FeatherIcon
                                                    name="check"
                                                    color={pickColors.whiteColor}
                                                    size={Responsive.font(5.5)}
                                                    onPress={() =>
                                                        navigation.navigate(screenNames.ChatsDetailsScreen, {
                                                            data: state?.data,
                                                            loginData: loginData,
                                                        })
                                                    }
                                                    style={[styles.featureIcon, { top: Responsive.heightPx(1) }]}
                                                />
                                                <Text style={styles.verifiedText}>Verified</Text>
                                            </View>
                                            <View style={styles.chatWrapper}>
                                                <FeatherIcon
                                                    name="message-square"
                                                    color={pickColors.whiteColor}
                                                    size={Responsive.font(5.5)}
                                                    onPress={() =>
                                                        navigation.navigate(screenNames.ChatsDetailsScreen, {
                                                            data: state?.data,
                                                            loginData: loginData,
                                                        })
                                                    }
                                                    style={styles.featureIcon}
                                                />
                                            </View>
                                            {state.isShortlistingWorking ? (
                                                <ActivityIndicator
                                                    size="large"
                                                    color={pickColors.brandColor}
                                                    style={styles.icon}
                                                />
                                            ) : (
                                                <TouchableOpacity style={styles.chatWrapper} onPress={() => handleShortlist(state?.data?._id)}>
                                                    <Icon
                                                        name="heart"
                                                        size={20}
                                                        style={[
                                                            styles.icon,
                                                            {
                                                                color: state?.isShortlisted
                                                                    ? pickColors.blackColor
                                                                    : pickColors.whiteColor,
                                                            },
                                                        ]}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.tabBar}
                            >
                                {tabs.map((tab) => (
                                    <TouchableOpacity
                                        key={tab.key}
                                        style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
                                        onPress={() => setActiveTab(tab.key)}
                                    >
                                        <View style={styles.aboutIcon}>
                                            <Image
                                                source={tab.image}
                                                style={styles.imageWrapperMain}
                                                tintColor={pickColors.blackColor}
                                            />
                                        </View>
                                        <Text style={activeTab === tab.key ? styles.activeTabText : styles.tabText}>
                                            {tab.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <View style={styles.userDetailsContainer}>
                                <View style={styles.aboutMyself}>
                                    {renderTabContent()}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}


                {isExpired && (
                    <>
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                        />

                        <View style={styles.popupContainer}>
                            <TouchableOpacity style={{ position: 'absolute', top: Responsive.heightPx(5), left: Responsive.widthPx(5), zIndex: 99 }} onPress={goBack}>
                                <FeatherIcon
                                    name="arrow-left"
                                    color={pickColors.blackColor}
                                    size={Responsive.font(7)}
                                />
                            </TouchableOpacity>
                            <View style={styles.popup}>
                                <Text style={styles.popupTitle}>Explore User Details</Text>
                                <Text style={styles.popupMessage}>
                                    Please purchase a plan to continue exploring user details.
                                </Text>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screenNames.SubscriptionScreen)}>
                                    <Text style={styles.buttonText}>Buy Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    );
};

export default UserDetailsScreen2;

const styles = StyleSheet.create({
    imageWrapper: {
        height: Responsive.heightPx(50),
        width: "100%",
        position: "relative",
    },
    imageContent: {
        position: "absolute",
        bottom: Responsive.heightPx(4),
        backgroundColor: pickColors.cardContentBg,
        width: "100%",
        paddingVertical: Responsive.heightPx(4),
        paddingHorizontal: Responsive.widthPx(4),
        flexDirection: "row",
        justifyContent: "space-between",

    },
    userDetailsContainer: {
        height: Responsive.heightPx(50),
        elevation: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: pickColors.whiteColor,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 20,
        position: "relative",
        top: Responsive.heightPx(-5),
        width: Responsive.widthPx(100)
    },
    aboutMyself: {
        paddingBottom: Responsive.heightPx(1.5),
        marginBottom: Responsive.heightPx(2),
        borderBottomWidth: 1,
        borderBottomColor: pickColors.lightGreyColor,
        elevation: 5,
        backgroundColor: pickColors.whiteColor,
        padding: 16,
        borderRadius: 10,
        height: Responsive.heightPx(90)
    },

    commonSectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: Responsive.widthPx(2),
    },

    textStyle: {
        color: pickColors.whiteColor,
        fontSize: Responsive.font(4),
    },
    aboutIcon: {
        height: Responsive.heightPx(5),
        width: Responsive.widthPx(10),
    },
    newTextStyle: {
        color: pickColors.blackColor,
        fontSize: Responsive.font(4.2),
        fontFamily: "SemiBold",
    },

    sectionWrapper: {
        marginTop: Responsive.heightPx(1),
    },
    mainWrappper: {
        marginBottom: Responsive.heightPx(7),
    },
    goBackButton: {
        position: "absolute",
        top: Responsive.heightPx(1.5),
        left: Responsive.widthPx(2.5),
        zIndex: 9999,
    },
    featureIcon: {
        position: "absolute",
        top: Responsive.heightPx(1.5),
        left: Responsive.widthPx(3.5),
        zIndex: 9999,
    },
    imageWrapperMain: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
    },
    aboutInnerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: Responsive.widthPx(2),
    },

    popupContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: Responsive.widthPx(5),
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    popupTitle: {
        fontSize: Responsive.font(5),
        fontFamily: "Ubuntu-Bold",
        marginBottom: 10,
    },
    popupMessage: {
        fontSize: Responsive.font(3.8),
        textAlign: "center",
        color: "grey",
        marginBottom: 20,
        fontFamily: "Ubuntu-Regular",
    },
    button: {
        backgroundColor: pickColors.brandColor,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: Responsive.font(3.8),
        fontFamily: "Ubuntu-Bold",
    },

    chatWrapper: {
        marginRight: Responsive.widthPx(2),
        backgroundColor: pickColors.brandColor,
        height: Responsive.heightPx(6),
        width: Responsive.widthPx(12),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "relative",
        top: Responsive.heightPx(6),
        right: Responsive.widthPx(1),
        zIndex: 99999
    },
    featureIconsWrapper: {
        flexDirection: "row",
        gap: Responsive.widthPx(-10)
    },
    verifiedText: {
        fontSize: Responsive.font(2),
        position: "relative",
        top: Responsive.heightPx(1),
        color: pickColors.whiteColor
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: pickColors.whiteColor,
        paddingVertical: Responsive.heightPx(2),
        paddingHorizontal: Responsive.widthPx(2),
        paddingTop: Responsive.heightPx(4),
        top: Responsive.heightPx(-5),


    },
    tabItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: Responsive.heightPx(2),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:5,
    },
    activeTab: {
        borderBottomWidth:5,
        borderColor:pickColors.brandColor
    },
    tabText: {
        color: pickColors.blackColor,
    },
    activeTabText: {
        color: pickColors.blackColor,
        fontWeight: "bold",
    },
    sectionText:{
        fontFamily:"Ubuntu-Regular"
    }
});
