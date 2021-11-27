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
} from 'react-native';
import { Button, Input, Distance, Option } from '../../components';
import { colors, fonts, responsiveHeight } from '../../utils';

export default class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvince: [],
      dataCity: [],
    };
  }

  render() {
    const { dataCity, dataProvince } = this.state;
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
              <Text style={styles.title}> Fill your Address </Text>
            </View>

            <View style={styles.cardSignup}>
              <Input label="Alamat" textarea />

              <Option label="Kota/Kab" datas={dataCity} />
              <Option label="Provinsi" datas={dataProvince} />

              <Distance height={30} />

              <Button
                title="Continue"
                type="textIcon"
                icon="submit"
                padding={12}
                fontSize={17}
                onPress={() => this.props.navigation.navigate('MainApp')}
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
