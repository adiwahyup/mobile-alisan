/* eslint-disable no-shadow */
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
import { Button, Input, Distance, Option } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';
import { getProvinceList, getCityList } from '../../actions/RajaOngkirAction';

class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      city: false,
      province: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getProvinceList());
  }

  componentDidUpdate(prevProps) {
    const { registerResult } = this.props;

    if (registerResult && prevProps.registerResult !== registerResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  changeProvince = province => {
    this.setState({
      province: province,
    });

    this.props.dispatch(getCityList(province));
  };

  onContinue = () => {
    const { address, city, province } = this.state;
    if (address && city && province) {
      const data = {
        name: this.props.route.params.name,
        email: this.props.route.params.email,
        phone: this.props.route.params.phone,
        address: address,
        province: province,
        city: city,
      };

      // menuju Auth Action
      // console.log('Data Diri : ', data);
      // this.props.dispatch(registerUser(data, password));
    } else {
      Alert.alert('Error', 'Semua bidang harus diisi');
    }
  };

  render() {
    const { address, city, province } = this.state;
    const { getProvinceResult, getCityResult } = this.props;
    // console.log(getCityResult);
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
              <Text style={styles.title}> Fill in your Address </Text>
            </View>

            <View style={styles.cardSignup}>
              <Input
                label="Alamat"
                textarea
                onChangeText={address => this.setState({ address })}
                value={address}
              />

              <Option
                label="Provinsi"
                datas={getProvinceResult ? getProvinceResult : []}
                selectedValue={province}
                onValueChange={province => this.changeProvince(province)}
              />
              <Option
                label="Kota/Kab"
                datas={getCityResult ? getCityResult : []}
                selectedValue={city}
                onValueChange={city => this.setState({ city: city })}
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

const mapStateToProps = state => ({
  getProvinceResult: state.RajaOngkirReducer.getProvinceResult,
  getCityResult: state.RajaOngkirReducer.getCityResult,
});

export default connect(mapStateToProps, null)(Register2);

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
    marginBottom: 15,
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
