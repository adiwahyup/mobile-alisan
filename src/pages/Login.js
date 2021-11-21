import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Distance, Input } from '../components/ComponentRouter';
import { colors, fonts } from '../utils/UtilsRouter';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.cardLogin}>
          <Input label="Email" />
          <Input label="Password" secureTextEntry />

          <Distance height={30} />
          <Button title="Login" type="text" padding={12} fontSize={17} />
        </View>

        <View style={styles.register}>
          <Text style={styles.textBlue}>Don't have an Account?</Text>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Signup now
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  cardLogin: {
    backgroundColor: colors.white,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  register: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textBlue: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
});
