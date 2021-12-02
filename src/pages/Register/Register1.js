import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, Input, Distance } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';

export default class Register1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
    };
  }

  onContinue = () => {
    const { name, email, phone, password } = this.state;
    if (name && email && phone && password) {
      /* validate fields then navigate to register 2
      and bring the state of the filled fields to register 2 */

      this.props.navigation.navigate('Register2', this.state);
    } else {
      Alert.alert('Error', 'Semua bidang harus diisi');
    }
  };

  render() {
    const { name, email, phone, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.btnBack}>
              <Button
                icon="arrow-left"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={styles.signup}>
              <Text style={styles.title}> Signup </Text>
              <Text style={styles.title}> Fill your details </Text>
            </View>

            <View style={styles.cardSignup}>
              <Input
                label="Name"
                value={name}
                onChangeText={name => this.setState({ name })}
              />
              <Input
                label="Email"
                value={email}
                onChangeText={email => this.setState({ email })}
              />
              <Input
                label="Phone Number"
                keyboardType="number-pad"
                value={phone}
                onChangeText={phone => this.setState({ phone })}
              />
              <Input
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={password => this.setState({ password })}
              />

              <Distance height={30} />

              <Button
                title="Continue"
                type="textIcon"
                icon="submit"
                padding={12}
                fontSize={17}
                onPress={() => this.onContinue()}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  signup: {
    alignItems: 'center',
    marginTop: responsiveHeight(50),
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
    marginTop: 15,
  },
  cardSignup: {
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
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 20,
    position: 'absolute',
  },
});
