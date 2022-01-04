import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const CardAddress = ({ address, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Address: </Text>
      <Text style={styles.address}>{address}</Text>
      {/* <Text style={styles.address}>Kota/Kab. {city}</Text>
      <Text style={styles.address}>Provinsi {province}</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editAddress}>Change Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.84,

    elevation: 15,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    fontFamily: fonts.primary.reguler,
    fontSize: 15,
  },
  editAddress: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    color: colors.primary,
    textAlign: 'right',
  },
});
