import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ImagePicker from "../../helpers/ImageHelper/ImagePicker";
import { getAllUsers } from "../../services/UserServices/UserServices";
import Loader from "../LoaderComponent/Loader";
import { pickColors } from "../../helpers/theme/colors";
import ErrorHandler from "../../services/NotificationServices/ErrorHandler";
import screenNames from "../../helpers/ScreenNames/ScreenNames";
import useCastes from "../../helpers/Hooks/useCastes";
import useLanguages from "../../helpers/Hooks/useLanguages";
import FilterModal from "../FilterModalComponents/FilterModal";
import useCityAndStates from "../../helpers/Hooks/useCityAndStates";

const SearchUsersListComponents = () => {
  const navigation = useNavigation();
  const { loginData } = useAuthStorage();
  const { castes } = useCastes();
  const { languages } = useLanguages()
  const [casteData, setCasteData] = useState([]);
  const [languagesData, setLanguagesData] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const [statesData, setStatesData] = useState([])

  const [filterVisible,setFilterVisible]= useState(false)
  const { cities, states } = useCityAndStates();
  const [loadingFilters, setLoadingFilters] = useState(true);




  const [filters, setFilters] = useState({
    gender: "",
    caste: "",
    language: "",
    city: "",
    minAge: 18,
    maxAge: 60,
  });


  useEffect(() => {
    const casteList = Array.isArray(castes?.data) ? castes?.data?.map((item) => item.caste) : [];
    const languageList = Array.isArray(languages?.data) ? languages?.data?.map((item) => item.language) : [];
    const citiesList = Array.isArray(cities?.data) ? cities?.data?.map((item) => item.name) : [];
    const statesList = Array.isArray(states?.data) ? states?.data?.map((item) => item.name) : [];
  
    setCasteData(casteList);
    setLanguagesData(languageList);
    setCitiesData(citiesList);
    setStatesData(statesList);
  
    if (
      casteList.length > 0 &&
      languageList.length > 0 &&
      citiesList.length > 0 &&
      statesList.length > 0
    ) {
      setLoadingFilters(false);
    }
  }, [castes?.data, languages?.data, cities?.data, states?.data]);
  



  const [state, setState] = useState({
    data: [],
    loading: false,
    refreshing: false,
  });

  const updateState = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUsersListData = async (appliedFilters = {}) => {
    updateState("loading", true);
    try {
      const result = await getAllUsers(appliedFilters);

      
      if (result?.success) {
        const filteredData = result.data.filter(
          (user) => user._id !== loginData?.data?._id
        );
        updateState("data", filteredData || []);
      } else {
        ErrorHandler(result.error.message);
      }
    } catch (error) {
      console.error(commonUtils.errorFetchingData, error);
    } finally {
      updateState("loading", false);
    }
  };

  useEffect(() => {
    getUsersListData();
  }, [loginData]);

  const onRefresh = useCallback(() => {
    updateState("refreshing", true);
    getUsersListData();
    setTimeout(() => updateState("refreshing", false), 2000);
  }, [loginData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(screenNames.DetailsScreen, {
          id: item._id,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof item.image === "string"
              ? { uri: item.image }
              : ImagePicker.placeholderIMage
          }
          style={[
            styles.imageStyle,
            item.image ?? { resizeMode: "cover", borderRadius: 10 },
          ]}
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.cardNameUpperWrp}>
          <View style={styles.nameHeartWrp}>
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
          <Text style={[styles.cardName, { fontFamily: "Ubuntu-Regular", fontSize: Responsive.font(3.5) }]}>
            {item.occupation || commonUtils.notAvailable}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>


      <View style={styles.filterActionRow}>

  <TouchableOpacity
    style={styles.filterWrapper}
    onPress={() => setFilterVisible(true)}
  >
    <Text style={styles.filterText}>Filters</Text>
  </TouchableOpacity>

  {Object.values(filters).some((val) => val !== "" && val !== 18 && val !== 60) && (
    <TouchableOpacity
      style={styles.clearBtnInline}
      onPress={() => {
        const defaultFilters = {
          gender: "",
          caste: "",
          language: "",
          city: "",
          minAge: 18,
          maxAge: 60,
        };
        setFilters(defaultFilters);
        getUsersListData(defaultFilters);
      }}
    >
      <Text style={styles.clearBtnText}>Clear All Filters</Text>
    </TouchableOpacity>
  )}

</View>

{Object.values(filters).some((val) => val !== "" && val !== 18 && val !== 60) && (
  <View style={styles.appliedFiltersWrapper}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {filters.gender !== "" && (
        <View style={styles.filterChip}>
          <Text style={styles.filterChipText}>
            Gender: {filters.gender}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const updated = { ...filters, gender: "" };
              setFilters(updated);
              getUsersListData(updated);
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {filters.city !== "" && (
        <View style={styles.filterChip}>
          <Text style={styles.filterChipText}>
            City: {filters.city}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const updated = { ...filters, city: "" };
              setFilters(updated);
              getUsersListData(updated);
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {filters.caste !== "" && (
        <View style={styles.filterChip}>
          <Text style={styles.filterChipText}>
            Caste: {filters.caste}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const updated = { ...filters, caste: "" };
              setFilters(updated);
              getUsersListData(updated);
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {filters.language !== "" && (
        <View style={styles.filterChip}>
          <Text style={styles.filterChipText}>
            Language: {filters.language}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const updated = { ...filters, language: "" };
              setFilters(updated);
              getUsersListData(updated);
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {(filters.minAge !== 18 || filters.maxAge !== 60) && (
        <View style={styles.filterChip}>
          <Text style={styles.filterChipText}>
            Age: {filters.minAge} - {filters.maxAge}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const updated = { ...filters, minAge: 18, maxAge: 60 };
              setFilters(updated);
              getUsersListData(updated);
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  </View>
)}
      {state?.loading ? (
        <Loader visible={state.loading} />
      ) : (
        <>
          {state?.data?.length > 0 ? (
            <FlatList
              data={state?.data.sort((a, b) => a.name.localeCompare(b.name))}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              refreshing={state.refreshing}
              onRefresh={onRefresh}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{commonUtils.noDataFound}</Text>
            </View>
          )}
        </>
      )}



<FilterModal
  visible={filterVisible}
  onClose={() => setFilterVisible(false)}
  onApply={(appliedFilters) => {
    setFilters(appliedFilters);
    setFilterVisible(false);
    getUsersListData(appliedFilters); 
  }}
  data={{
    cities: citiesData,
    states:statesData,
    castes: casteData,
    languages: languagesData
  }}
  loading={loadingFilters}
/>

    </View>
  );
};

export default SearchUsersListComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pickColors.whiteColor,
  },

  flatListContent: {
    justifyContent: "space-between",
    paddingHorizontal: Responsive.widthPx(3),
    paddingBottom: Responsive.heightPx(5),
  },
  card: {
    flexDirection: "column",
    backgroundColor: pickColors.whiteColor,
    elevation: 3,
    backgroundColor: pickColors.whiteColor,
    margin: Responsive.widthPx(2.2),
    borderRadius: 15,
  },
  imageStyle: {
    height: Responsive.heightPx(20),
    width: Responsive.widthPx(38),
    resizeMode: "cover",
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: pickColors.imageBgColor,
    padding: Responsive.widthPx(2),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  contentWrapper: {
    width: Responsive.widthPx(36),
    paddingVertical: Responsive.heightPx(1.3),
    paddingHorizontal: Responsive.widthPx(3)
  },

  cardName: {
    color: pickColors.blackColor,
    fontFamily: "Ubuntu-Bold",
    fontSize: Responsive.font(4),
  },
  cardDescription: {
    fontSize: Responsive.font(2.7),
    color: pickColors.lightGreyColor,
    fontFamily: "Regular",
  },

  priceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPx(2),
  },
  priceText: {
    color: pickColors.primaryButtonColor,
    backgroundColor: pickColors.skyBlueColor,
    paddingHorizontal: Responsive.widthPx(2.5),
    paddingVertical: Responsive.heightPx(0.5),
    alignSelf: "auto",
    textAlign: "center",
    borderRadius: 10,
  },

  priceValueWrp: {
    flexDirection: "row",
  },
  currencyText: {
    color: pickColors.primaryButtonColor,
  },
  priceValue: {
    color: pickColors.primaryButtonColor,
    fontFamily: "Regular",
    fontSize: Responsive.font(5),
  },
  heartIcon: {
    position: "absolute",
    right: Responsive.widthPx(0),
    top: Responsive.heightPx(0),
    fontSize: Responsive.font(5.2),
    color: pickColors.lightGreyColor,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Responsive.heightPx(20),
  },
  noDataText: {
    fontSize: Responsive.font(4),
    color: pickColors.lightGreyColor,
    fontFamily: "SemiBold",
  },

  cardNameUpperWrp: {
    flexDirection: "column",
    gap: Responsive.heightPx(1),
  },

  nameHeartWrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filterWrapper: {
    backgroundColor: pickColors.whiteColor,
    width: Responsive.widthPx(20),
    borderRadius: 10,
    paddingHorizontal:Responsive.widthPx(3),
    paddingVertical:Responsive.heightPx(1),
    marginHorizontal: Responsive.widthPx(2),
    marginVertical: Responsive.heightPx(1),
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    borderWidth:0.5,
    elevation:5,
  
  },

  filterText: {
    color: pickColors.blackColor,
    fontSize: Responsive.font(4),
    fontFamily: "Ubuntu-Medium"
  }
  ,
  filterActionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: Responsive.widthPx(5),
    marginVertical: Responsive.heightPx(1),
    gap: Responsive.widthPx(2),
  },
  
  clearBtnInline: {
    backgroundColor: pickColors.brandColor,
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(1.2),
    borderRadius: 10,
    elevation: 5,
  },

  appliedFiltersWrapper: {
    marginHorizontal: Responsive.widthPx(5),
    marginBottom: Responsive.heightPx(1),
    flexDirection: "column",
    gap: 8,
  },
  
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: pickColors.brandColor,
    elevation: 5,
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(0.8),
    borderRadius: 20,
    marginRight: Responsive.widthPx(3),
    marginBottom: Responsive.heightPx(2),
    gap: 8, // space between text and close icon
  },
  
  closeIcon: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3),
    marginLeft: Responsive.widthPx(1),
  },
  
  filterChipText: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3.2),
    fontFamily: "Ubuntu-Regular",
  },
  
  clearBtn: {
    alignSelf: "flex-end",
    backgroundColor: pickColors.redColor || "#ff4d4d",
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(1),
    borderRadius: 10,
  },
  
  clearBtnText: {
    color: pickColors.whiteColor,
    fontSize: Responsive.font(3.5),
    fontFamily: "Ubuntu-Medium",
  },
});
