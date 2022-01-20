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
          <Picker.Item label="--Pilih--" value="" />
          {Object.keys(datas).map((key, index) => {
            if (label === 'Ukuran') {
              return (
                <Picker.Item
                  label={datas[key].ssp_size}
                  value={datas[key]}
                  key={datas[key].ssp_id}
                />
              );
            } else {
              return <Picker.Item label={key} value={key} key={index} />;
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
    marginTop: -3,
    marginBottom: 3,
    color: colors.black,
  }),
  wrapPicker: {
    borderWidth: 1.3,
    borderRadius: 15,
    borderColor: colors.border,
  },
});
