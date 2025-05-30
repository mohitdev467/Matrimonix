import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { pickColors } from '../../helpers/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';



const FilterModal = ({ visible, onClose, onApply, data, loading }) => {
  const [gender, setGender] = useState(null);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(40);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);

  const handleApply = () => {
    onApply({
      gender,
      minAge,
      maxAge,
      city: selectedCity,
      state: selectedState,
      caste: selectedCaste,
      language: selectedLanguage,
    });
    onClose();
  };

  const renderDropdown = (label, value, setValue, listKey) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setShowDropdown(showDropdown === listKey ? null : listKey)}
      >
        <View style={styles.dropdownHeader}>

          <Text>{value || `Select ${label}`}</Text>
          <Ionicons
            name={showDropdown === listKey ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {showDropdown === listKey && (
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={pickColors.brandColor} />
          </View>
        ) : (
          <FlatList
            style={styles.dropdownList}
            data={data[listKey]}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setValue(item);
                  setShowDropdown(null);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>Filter Users</Text>

            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.radioButton}
                  onPress={() => setGender(g)}
                >
                  <View style={styles.radioCircle}>
                    {gender === g && <View style={styles.selectedRb} />}
                  </View>
                  <Text style={styles.radioText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Age Range: {minAge} - {maxAge}</Text>
            <MultiSlider
              values={[minAge, maxAge]}
              min={18}
              max={80}
              step={1}
              onValuesChange={(values) => {
                setMinAge(values[0]);
                setMaxAge(values[1]);
              }}
              selectedStyle={{
                backgroundColor: '#1fb28a',
              }}
              unselectedStyle={{
                backgroundColor: '#ccc',
              }}
              markerStyle={{
                backgroundColor: '#1fb28a',
              }}
              containerStyle={{ marginHorizontal: 10 }}
            />

            {/* Dropdowns */}
            {renderDropdown('City', selectedCity, setSelectedCity, 'cities')}
            {renderDropdown('State', selectedState, setSelectedState, 'states')}
            {renderDropdown('Caste', selectedCaste, setSelectedCaste, 'castes')}
            {renderDropdown('Language', selectedLanguage, setSelectedLanguage, 'languages')}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, { backgroundColor: pickColors.lightGreyColor }]} onPress={onClose}>
                <Text style={{ color: pickColors.blackColor, fontFamily: 'Ubuntu-Medium' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleApply}>
                <Text style={{ color: pickColors.whiteColor, fontFamily: 'Ubuntu-Medium' }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioText: {
    marginLeft: 6,
  },
  dropdownContainer: {
    marginTop: 10,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 100,
    marginTop: 4,
    borderRadius: 6,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: pickColors.brandColor,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
});

export default FilterModal;
