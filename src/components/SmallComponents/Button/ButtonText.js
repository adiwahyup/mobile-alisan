import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';

const ButtonText = ({
  padding,
  title,
  onPress,
  fontSize,
  borderRadius,
  backgroundColor,
  color,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container(padding, borderRadius, backgroundColor)}
      onPress={onPress}>
      <Text style={styles.text(fontSize, color)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  container: (padding, borderRadius, backgroundColor) => ({
    backgroundColor: backgroundColor ? backgroundColor : colors.primary,
    padding: padding,
    borderRadius: borderRadius ? borderRadius : 25,
  }),
  text: (fontSize, color) => ({
    color: color ? color : colors.white,
    textAlign: 'center',
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.bold,
  }),
});
