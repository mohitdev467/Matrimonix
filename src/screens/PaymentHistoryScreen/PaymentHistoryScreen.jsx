import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { handlePaymentHistory } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithSearchBack from "../../components/CommonComponents/HeaderWithBack";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import { pickColors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Loader from "../../components/LoaderComponent/Loader";

const PaymentHistoryScreen = () => {
  const [payments, setPayments] = useState([]);
  const { loginData } = useAuthStorage();
  const [isLoading,setIsLoading]= useState(false)

  const fetchPaymentHistory = async () => {
    const userId = loginData?.data?._id;
    if (!userId) {
      console.warn("User ID is undefined");
      return;
    }
    setIsLoading(true)
    try {
      const response = await handlePaymentHistory(userId);
      console.log("respjnseeeeee", response)
      setPayments(response.data || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally{
      setIsLoading(false)
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
        <>
      <FlatList
        data={payments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.innerCard}>

              <Text style={[styles.text, {color:pickColors.blackColor, fontWeight:'800'}]}>Order ID:- </Text>
              <Text style={styles.text}>{item.orderId}</Text>

            </View>
            <View style={styles.innerCard}>
              <Text style={[styles.text, {color:pickColors.blackColor, fontWeight:'800'}]}>Status:- </Text>
              <Text style={styles.text}>{item.status}</Text>
            </View>
            <View style={styles.innerCard}>
              <Text style={[styles.text, {color:pickColors.blackColor, fontWeight:'800'}]}>Amount: </Text>
              <Text style={styles.text}>₹ {item.amount}</Text>
            </View>

            <View style={styles.innerCard}>
              <Text style={[styles.text, {color:pickColors.blackColor, fontWeight:'800'}]}>Package: </Text>
              <Text style={styles.text}>{item.packages?.subscriptionType || "N/A"}</Text>

            </View>
            <View style={styles.innerCard}>
              <Text style={[styles.text, {color:pickColors.blackColor, fontWeight:'800'}]}>Date: </Text>
              <Text style={styles.text}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
      </>
       ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
              </View>
            )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },
  card: {
    padding: 15,
    marginVertical: Responsive.heightPx(2),
    marginHorizontal: 10,
    backgroundColor: pickColors.whiteColor,
    borderRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor:pickColors.brandColor

  },
  innerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical:Responsive.heightPx(0.5)
  },
  text: {
    color: pickColors.brandColor,
    fontSize:Responsive.font(3.5)
  },
});

export default PaymentHistoryScreen;
