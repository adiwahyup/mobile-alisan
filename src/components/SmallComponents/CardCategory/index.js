import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, responsiveHeight, responsiveWidth } from '../../../utils';

const CardCategory = ({ category }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={category.gambar} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
  },
  logo: {
    width: responsiveWidth(60),
    height: responsiveHeight(70),
  },
});
