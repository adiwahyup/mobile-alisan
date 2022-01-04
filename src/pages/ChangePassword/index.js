import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from '../../components';
import { colors, getData, responsiveHeight } from '../../utils';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    };
  }

  onSubmit = () => {
    const { password, newPassword, newPasswordConfirmation } = this.state;
    if (newPassword !== newPasswordConfirmation) {
      Alert.alert(
        'Error',
        'New Password and New Password Confirmation not match',
      );
    } else if (password && newPassword && newPasswordConfirmation) {
      // get data email from local storage
      getData('user').then(res => {
        const params = {
          email: res.email,
          password: password,
          newPassword: newPassword,
        };
        // this.props.dispatch(changePassword(params));
      });
    } else {
      Alert.alert('Error', 'Please enter all the required fields');
    }
  };

  render() {
    const { password, newPassword, newPasswordConfirmation } = this.state;
    return (
      <View style={styles.page}>
        <View>
          <Input
            label="Password Lama"
            secureTextEntry
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          <Input
            label="Password Baru"
            secureTextEntry
            value={newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
          />
          <Input
            label="Konfirmasi Password Baru"
            secureTextEntry
            value={newPasswordConfirmation}
            onChangeText={newPasswordConfirmation =>
              this.setState({ newPasswordConfirmation })
            }
          />
        </View>

        <View style={styles.submit}>
          <Button
            title="Submit"
            type="textIcon"
            icon="submit"
            padding={responsiveHeight(10)}
            fontSize={18}
            onPress={() => this.onSubmit()}
          />
        </View>
      </View>
    );
  }
}

export default connect()(ChangePassword);

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
