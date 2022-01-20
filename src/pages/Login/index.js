import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, Distance, Input } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';
import { loginUser } from '../../actions/AuthAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    const { email, password } = this.state;
    if (email && password) {
      const data = {
        email: email,
        password: password,
      };
      this.props.dispatch(loginUser(data));
    } else {
      Alert.alert('Info', 'Email dan Password harus diisi');
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult } = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.signin}>
          <Text style={styles.title}>Login</Text>
        </View>
        <Distance height={responsiveHeight(70)} />
        <View style={styles.cardLogin}>
          <Input
            label="Email"
            value={email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({ password })}
          />

          <Distance height={30} />
          <Button
            title="Login"
            type="text"
            padding={12}
            fontSize={17}
            loading={loginLoading}
            onPress={() => this.login()}
          />
        </View>
        <View style={styles.register}>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register')}>
            Belum Punya Akun?
          </Text>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register')}>
            Daftar Disini
          </Text>
        </View>
        <Distance height={50} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

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
  signin: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
    textTransform: 'uppercase',
  },
});
