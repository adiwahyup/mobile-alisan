import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, colors, responsiveHeight } from '../../../utils';
import { Picker } from '@react-native-picker/picker';

const Size = ({
  label,
  datas,
  width,
  height,
  fontSize,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="--Choose--" value="" />
          {Object.keys(datas).map((key, index) => {
            if (label === 'Size') {
              return (
                <Picker.Item
                  label={datas[key].ssp_size}
                  value={datas[key]}
                  key={datas[key].ssp_id}
                />
              );
            } else {
              // return <Picker.Item label={item} value={item} key={index} />;
            }
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Size;

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
    fontFamily: fonts.primary.reguler,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
    width: width,
    height: height ? height : responsiveHeight(42),
    marginTop: -10,
    marginBottom: 10,
  }),
  wrapPicker: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.border,
  },
});
