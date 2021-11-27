import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '../../components';
import { colors, responsiveHeight } from '../../utils';

export default class ChangePassword extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View>
          <Input label="Password Lama" secureTextEntry />
          <Input label="Password Baru" secureTextEntry />
          <Input label="Konfirmasi Password Baru" secureTextEntry />
        </View>

        <View style={styles.submit}>
          <Button
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(10)}
            fontSize={18}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  submit: {
    marginVertical: 30,
  },
});
