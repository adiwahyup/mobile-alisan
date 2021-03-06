import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const Input = ({
  textarea,
  width,
  height,
  fontSize,
  placeholder,
  label,
  value,
  secureTextEntry,
  keyboardType,
  onChangeText,
  disabled,
}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text styles={styles.label}>{label} :</Text>
        <TextInput
          style={styles.inputTextArea(fontSize)}
          multiline={true}
          numberOfLines={3}
          value={value}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text styles={styles.label}>{label} :</Text>
      <TextInput
        style={styles.input(width, height, fontSize)}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        editable={disabled ? false : true}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.bold,
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
    width: width,
    height: height,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }),
  inputTextArea: fontSize => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.reguler,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  }),
});
