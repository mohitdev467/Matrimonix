import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import screenNames from "../../helpers/ScreenNames/ScreenNames";

export const moreScreenOptonsList = [
  {
    id: 1,
    title: "News",
    isMore: true,
    iconName: "globe",
    link: screenNames.NewsScreen,
  },
  {
    id: 2,
    title: "Service Providers",
    isMore: true,
    isFeather: true,
    iconName: "file-text",
    link: screenNames.ServieProviderScreen,
  },

  {
    id: 3,
    title: "Chats",
    iconName: "message-circle",
    isMore: true,
    isFeather: true,
    link: screenNames.ChatsScreen,
  },

  {
    id: 4,
    title: "Update Profile",
    isFeather: true,
    isMore: true,
    iconName: "user",
    link: screenNames.UpdateProfileScreen,
  },
  {
    id: 5,
    title: "Notifications",
    isFeather: true,
    isMore: true,
    iconName: "bell",
    link: screenNames.NotificationScreen,
  },
  {
    id: 6,
    title: "Subscription",
    isFeather: true,
    isMore: true,
    iconName: "credit-card",
    link: screenNames.SubscriptionScreen,
  },
  {
    id: 7,
    title: "Payment History",
    isFeather: true,
    isMore: true,
    iconName: "layers",
    link: screenNames.PaymentHistoryScreen,
  },

  {
    id: 8,
    title: "Shortlisted",
    isFeather: true,
    isMore: true,
    iconName: "bookmark",
    link: screenNames.ShortlistedScreen,
  },

  {
    id: 9,
    title: "Contact Us",
    isMore: true,
    iconName: "phone",
    link: screenNames.ContactScreen,
  },
  {
    id: 10,
    title: "About Us",
    isMore: true,
    isFeather: true,
    iconName: "info",
    link: screenNames.AboutusScreen,
  },
  {
    id: 11,
    title: "Refund Policy",
    isMore: true,
    isFeather: true,
    iconName: "info",
    link: screenNames.RefundPolicyScreen,
  },
  {
    id: 12,
    title: "Privacy Policy",
    isMore: true,
    isFeather: true,
    iconName: "info",
    link: screenNames.PrivacyPolicyScreen,
  },
  {
    id: 13,
    title: "Terms & Conditions",
    isMore: true,
    isFeather: true,
    iconName: "info",
    link: screenNames.TermsAndConditionsScreen,
  },
  {
    id: 14,
    title: "Delete Account",
    isMore: true,
    isFeather: true,
    iconName: "trash",
    link: screenNames.DeleteAccountScreen,
  },
];

export const updateProfileContent = {
  profileImage: ImagePicker.dummyUserImage,
  userName: "Emily Johnson",
  trainerLevel: "Pro Trainer",
  emailUser: "@emilyj",
  fullName: "Emily Johnson",
  phoneNo: "7828058757",
  specification: "Kettlebell Swings",
  address: "Vijay Nagar, Indore",
};
