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
import { connect } from 'react-redux';
import { Button, Input, Distance } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';
import { registerUser } from '../../actions/AuthAction';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { registerResult } = this.props;

    if (registerResult && prevProps.registerResult !== registerResult) {
      this.props.navigation.replace('Login');
    }
  }

  onContinue = () => {
    const { name, email, phone, address, password } = this.state;
    if (name && email && phone && address && password) {
      const data = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
      };

      this.props.dispatch(registerUser(data));
    } else {
      Alert.alert('Info', 'Silahkan Isi Semua Bidang');
    }
  };

  render() {
    const { name, email, phone, address, password } = this.state;
    const { registerLoading } = this.props;
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
              <Text style={styles.title}> Register </Text>
            </View>

            <View style={styles.cardSignup}>
              <Input
                label="Nama"
                value={name}
                onChangeText={name => this.setState({ name })}
              />
              <Input
                label="Email"
                value={email}
                onChangeText={email => this.setState({ email })}
              />
              <Input
                label="Nomor Telepon"
                keyboardType="number-pad"
                value={phone}
                onChangeText={phone => this.setState({ phone })}
              />
              <Input
                label="Alamat"
                textarea
                onChangeText={address => this.setState({ address })}
                value={address}
              />

              <Input
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={password => this.setState({ password })}
              />

              <Distance height={25} />

              <Button
                title="Daftar"
                type="textIcon"
                icon="submit"
                padding={12}
                fontSize={17}
                onPress={() => this.onContinue()}
                loading={registerLoading}
              />
              <View style={styles.login}>
                <Text
                  style={styles.textBlue}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Sudah Punya Akun?
                </Text>
                <Text
                  style={styles.textBlue}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Login Disini
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});
export default connect(mapStateToProps, null)(Register);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 15,
  },
  signup: {
    alignItems: 'center',
    marginTop: responsiveHeight(30),
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
    marginTop: 10,
    textTransform: 'uppercase',
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
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 20,
    position: 'absolute',
  },
  login: {
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
