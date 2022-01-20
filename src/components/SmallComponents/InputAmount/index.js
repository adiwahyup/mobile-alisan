import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { colors, fonts, responsiveHeight } from '../../../utils';

const InputAmount = ({
  max,
  min,
  maxLength,
  step,
  skin,
  colorMax,
  colorMin,
  colorPress,
  value,
  onChange,
  label,
  fontSize,
  width,
  height,
}) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapQty}>
        <InputSpinner
          style={styles.spinner(width, height, fontSize)}
          max={max}
          min={min}
          maxLength={maxLength}
          step={step}
          skin={skin}
          colorMax={colorMax}
          colorMin={colorMin}
          colorPress={colorPress}
          onChange={onChange}
          value={value}
        />
      </View>
    </View>
  );
};

export default InputAmount;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
  }),
  spinner: (width, height, fontSize) => ({
    width: width,
    height: height ? height : responsiveHeight(42),
    padding: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 15,
    shadowRadius: 6.84,
    elevation: -1,
  }),
  wrapQty: {
    borderWidth: 1.5,
    borderRadius: 14,
    borderColor: colors.border,
  },
});
