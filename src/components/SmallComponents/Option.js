import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, colors, responsiveHeight } from '../../utils/UtilsRouter';
import { Picker } from '@react-native-picker/picker';

const Option = ({ label, datas, width, height, fontSize }) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text styles={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="--Pilih--" value="" />
          {datas.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
    width: width,
    height: height ? height : responsiveHeight(38),
    marginTop: -10,
    marginBottom: 10,
  }),
  wrapPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  },
});
