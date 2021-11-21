import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../utils/UtilsRouter';

const ButtonText = ({ padding, title, onPress, fontSize }) => {
  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Text style={styles.text(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.primary,
    padding: padding,
    borderRadius: 10,
  }),
  text: fontSize => ({
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize ? fontSize : 13,
    fontFamily: fonts.primary.bold,
  }),
});
