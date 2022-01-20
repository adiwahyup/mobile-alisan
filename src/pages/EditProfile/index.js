import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, ButtonText, Distance, Input } from '../../components';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import { updateProfile } from '../../actions/ProfileAction';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    const { updateProfileResult } = this.props;

    if (
      updateProfileResult &&
      prevProps.updateProfileResult !== updateProfileResult
    ) {
      Alert.alert('Success', 'Profile Updated! ');
      this.props.navigation.navigate('EditProfile');
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;
      this.setState({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    });
  };

  onSubmit = () => {
    const { name, phone, email, address } = this.state;
    if (name && phone && email && address) {
      // dispatch update
      this.props.dispatch(updateProfile(this.state));
    } else {
      Alert.alert('Warning', 'Please enter all the fields');
    }
  };

  render() {
    const { name, email, phone, address, password } = this.state;
    const { updateProfileLoading } = this.props;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
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
            label="Phone"
            keyboardType="number-pad"
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <Input
            label="Address"
            value={address}
            onChangeText={address => this.setState({ address })}
            textarea
          />
          <Input
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <View style={styles.update}>
          <Button
            loading={updateProfileLoading}
            title="Update"
            type="text"
            padding={responsiveHeight(15)}
            fontSize={18}
            onPress={() => this.onSubmit()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  container: {
    marginVertical: 20,
    padding: 10,
    marginBottom: responsiveHeight(40),
  },

  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },

  update: {
    paddingHorizontal: 8,
  },
});
