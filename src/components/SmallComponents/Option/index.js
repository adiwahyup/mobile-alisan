import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, colors, responsiveHeight } from '../../../utils';
import { Picker } from '@react-native-picker/picker';

const Option = ({
  label,
  datas,
  width,
  height,
  fontSize,
  selectedValue,
  onValueChange,
  borderColor,
  borderRadius,
  borderWidth,
}) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapPicker(borderColor, borderRadius, borderWidth)}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="--Pilih--" value="" />
          {datas.map((item, index) => {
            if (label === 'Provinsi') {
              return (
                <Picker.Item
                  label={item.province}
                  value={item.province_id}
                  key={item.province_id}
                />
              );
            } else if (label === 'Kota/Kab') {
              return (
                <Picker.Item
                  label={item.type + ' ' + item.city_name}
                  value={item}
                  key={item.city_id}
                />
              );
            } else if (label === 'Ekspedisi') {
              return (
                <Picker.Item label={item.label} value={item} key={item.id} />
              );
            } else if (label === 'Paket') {
              return (
                <Picker.Item
                  label={item.service + ' ' + '(' + item.description + ')'}
                  value={item}
                  key={new Date().getMilliseconds + Math.random()}
                />
              );
            } else {
              return <Picker.Item label={item} value={item} key={index} />;
            }
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.bold,
    width: width,
    height: height ? height : responsiveHeight(42),
    marginTop: -10,
    marginBottom: 10,
    color: colors.black,
  }),
  wrapPicker: (borderColor, borderRadius, borderWidth) => ({
    borderWidth: borderWidth ? borderWidth : 1,
    borderRadius: borderRadius ? borderRadius : 15,
    borderColor: borderColor ? borderColor : colors.border,
  }),
});
