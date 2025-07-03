import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Collapsible from "react-native-collapsible";
import {  handleDeletePaymentHistory, handlePaymentHistory } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Loader from "../../components/LoaderComponent/Loader";
import FeatherIcon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import ModalComponent from "../../components/CommonComponents/ModalComponent";
import successHandler from "../../services/NotificationServices/SuccessHandler";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PaymentHistoryScreen = () => {
  const [payments, setPayments] = useState([]);
  const { loginData } = useAuthStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const toggleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveId(prev => (prev === id ? null : id));
  };

  const fetchPaymentHistory = async () => {
    const userId = loginData?.data?._id;
    if (!userId) {
      console.warn("User ID is undefined");
      return;
    }
    setIsLoading(true);
    try {
      const response = await handlePaymentHistory(userId);
      setPayments(response.data || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const promptDeletePayment = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setDeleteModalVisible(true);
  };
  
  const confirmDeletePayment = async () => {
    const userId = loginData?.data?._id;
    if (!selectedPaymentId || !userId) return;
  
    setIsLoading(true);
    try {
      const response = await handleDeletePaymentHistory(userId, selectedPaymentId);
      if (response?.success) {
        successHandler(response?.message)
        fetchPaymentHistory();
      } else {
        ErrorHandler(response?.message)
      }
    } catch (error) {
      console.error("Error in deleting history", error);
    } finally {
      setIsLoading(false);
      setDeleteModalVisible(false);
      setSelectedPaymentId(null);
    }
  };


  useEffect(() => {
    if (loginData?.data?._id) {
      fetchPaymentHistory();
    }
  }, [loginData]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearchBack
        headerTitle={commonUtils.PaymentHistory}
        isBackHeader={true}
        icon={"arrow-left"}
      />

      {isLoading ? (
        <Loader visible={isLoading} />
      ) : payments?.length > 0 ? (
        <FlatList
          data={payments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const isActive = activeId === item._id;

            return (
              <View style={styles.card}>
                {/* Accordion Header */}
                <TouchableOpacity onPress={() => toggleAccordion(item._id)} style={styles.accordianHeader}>
                  <Text style={styles.accordionHeader}>Order ID: {item.orderId}</Text>
                  <FeatherIcon name="chevron-down" style={styles.iconStyle} />

                </TouchableOpacity>

                {/* Accordion Body */}
                <Collapsible collapsed={!isActive}>
                  <View style={styles.innerCard}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{item.paymentStatus}</Text>
                  </View>
                  <View style={styles.innerCard}>
                    <Text style={styles.label}>Amount:</Text>
                    <Text style={styles.value}>₹ {item.amount}</Text>
                  </View>
                  <View style={styles.innerCard}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>
                      {moment(item.createdAt).format("DD-MMM-YYYY")}
                    </Text>
                  </View>

                  <TouchableOpacity
  onPress={() => promptDeletePayment(item._id)}
  style={styles.deleteButton}
>
  <FeatherIcon name="trash" size={22} color="red" />
</TouchableOpacity>
                </Collapsible>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
        </View>
      )}


<ModalComponent
  isVisible={isDeleteModalVisible}
  onClose={() => setDeleteModalVisible(false)}
  title="Delete Payment History"
>
  <Text style={styles.modalText}>
    Are you sure you want to delete this payment history?
  </Text>

  <View style={styles.modalButtonContainer}>
    <TouchableOpacity
      style={[styles.modalButton, styles.cancelButton]}
      onPress={() => setDeleteModalVisible(false)}
    >
      <Text style={styles.cancelButtonText}>No</Text>
    </TouchableOpacity>

    {isLoading ? (
      <Loader visible={isLoading} />
    ) : (
      <TouchableOpacity
        style={[styles.modalButton, styles.confirmButton]}
        onPress={confirmDeletePayment}
      >
        <Text style={styles.confirmButtonText}>Yes</Text>
      </TouchableOpacity>
    )}
  </View>
</ModalComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  card: {
    marginVertical: Responsive.heightPx(2),
    marginHorizontal: 10,
    backgroundColor: pickColors.whiteColor,
    borderRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: pickColors.brandColor,
    paddingHorizontal: Responsive.widthPx(2),
    paddingVertical: Responsive.heightPx(2)
  },
  accordionHeader: {
    color: pickColors.blackColor,
    fontWeight: "bold",
    fontSize: Responsive.font(3.5),
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPx(1),
  },
  label: {
    color: pickColors.blackColor,
    fontWeight: "800",
    fontSize: Responsive.font(3.5),
  },
  value: {
    color: pickColors.brandColor,
    fontSize: Responsive.font(3.5),
    fontFamily: "Ubuntu-Medium"
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    color: pickColors.textGray,
  },
  accordianHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   marginHorizontal:Responsive.widthPx(3.5)
  },
  deleteButton: {
    marginTop: Responsive.heightPx(2),
    alignSelf: "flex-end",
    padding: 5,
  },

   modalText: {
        textAlign: "center",
        fontSize: Responsive.font(3.8),
        fontFamily: "Ubuntu-Medium",
        marginVertical: Responsive.heightPx(2),
      },
      modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Responsive.heightPx(2),
        height: Responsive.heightPx(6),
      },
      modalButton: {
        paddingVertical: Responsive.heightPx(1.5),
        paddingHorizontal: Responsive.widthPx(10),
        borderRadius: 8,
      },
      cancelButton: {
        backgroundColor: pickColors.cardContentBg,
      },
      confirmButton: {
        backgroundColor: pickColors.brandColor,
      },
      cancelButtonText: {
        color: pickColors.whiteColor,
        fontSize: Responsive.font(4),
        fontFamily: "Ubuntu-Medium",
      },
      confirmButtonText: {
        color: pickColors.whiteColor,
        fontFamily: "Ubuntu-Medium",
        fontSize: Responsive.font(4),
      },
});

export default PaymentHistoryScreen;
