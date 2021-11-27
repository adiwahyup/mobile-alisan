import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  IconKeranjang,
  IconBack,
  IconKeranjangPutih,
  IconSubmit,
} from '../../../assets';
import { colors, fonts } from '../../../utils';
import Distance from '../Distance';

const TextIcon = ({ icon, padding, onPress, title, fontSize }) => {
  const Icon = () => {
    if (icon === 'keranjang') {
      return <IconKeranjang />;
    } else if (icon === 'arrow-left') {
      return <IconBack />;
    } else if (icon === 'keranjang-putih') {
      return <IconKeranjangPutih />;
    } else if (icon === 'submit') {
      return <IconSubmit />;
    }

    return <IconKeranjang />;
    // return icon === 'keranjang' ? <IconKeranjang /> : <IconKeranjang />;
  };

  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Icon />
      <Distance width={5} />
      <Text style={styles.title(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.primary,
    padding: padding,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: fontSize => ({
    color: colors.white,
    fontSize: fontSize ? fontSize : 15,
    fontFamily: fonts.primary.bold,
  }),
});
