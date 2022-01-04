import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconKeranjang, IconBack, IconSubmit } from '../../../assets';
import { colors } from '../../../utils';
import ButtonText from './ButtonText';
import Loading from './Loading';
import TextIcon from './TextIcon';

const Button = props => {
  const Icon = () => {
    if (icon === 'keranjang') {
      return <IconKeranjang />;
    } else if (icon === 'arrow-left') {
      return <IconBack />;
    } else if (icon === 'submit') {
      return <IconSubmit />;
    }

    return <IconKeranjang />;
    // return icon === 'keranjang' ? <IconKeranjang /> : <IconKeranjang />;
  };

  const { icon, totalCart, padding, type, onPress, loading } = props;

  // Loading
  if (loading) {
    return <Loading {...props} />;
  }

  if (type === 'text') {
    return <ButtonText {...props} />;
  } else if (type === 'textIcon') {
    return <TextIcon {...props} />;
  }

  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Icon />
      {totalCart && (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{totalCart}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.white,
    padding: padding,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  }),
  notif: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 3,
  },
  textNotif: {
    fontSize: 10,
    color: colors.white,
  },
});

export default Button;
