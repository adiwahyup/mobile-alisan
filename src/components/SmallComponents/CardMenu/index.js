import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconArrowRight } from '../../../assets';
import { colors, responsiveHeight, fonts, clearStorage } from '../../../utils';

const CardMenu = ({ menu, navigation }) => {
  const onSubmit = () => {
    if (menu.nama === 'Sign Out') {
      console.log('Logout');
      clearStorage();
      navigation.replace('MainApp');
    } else {
      navigation.navigate(menu.page);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
      <View style={styles.menu}>
        {menu.gambar}
        <Text style={styles.text}>{menu.nama}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    marginHorizontal: 25,
    padding: responsiveHeight(21),
    borderRadius: 17,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    marginLeft: 22,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
