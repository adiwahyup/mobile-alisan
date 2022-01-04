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
}) => {
  // console.log('test datas', datas);
  return (
    <View style={styles.container}>
      <Text styles={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="--Choose--" value="" />
          {datas.map((item, index) => {
            if (label === 'Province') {
              return (
                <Picker.Item
                  label={item.province}
                  value={item.province_id}
                  key={item.province_id}
                />
              );
            } else if (label === 'City/District') {
              return (
                <Picker.Item
                  label={item.type + ' ' + item.city_name}
                  value={item}
                  key={item.city_id}
                />
              );
            } else if (label === 'Expedition') {
              return (
                <Picker.Item label={item.label} value={item} key={item.id} />
              );
            } else if (label === 'Package') {
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
          {/* {Object.keys(datas).map((key, index) => {
            console.log(datas[key].ssp_size);
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
          })} */}
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
