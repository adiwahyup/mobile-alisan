import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import { Button, Input, Option } from '../../components';
import { dummyProfile } from '../../data';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvince: [],
      dataCity: [],
      profile: dummyProfile,
    };
  }

  render() {
    const { dataCity, dataProvince, profile } = this.state;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input label="Nama" value={profile.name} />
          <Input label="Email" value={profile.email} />
          <Input label="Telepon" value={profile.phone} />
          <Input label="Alamat" value={profile.address} textarea />

          <Option label="Kota/Kab" datas={dataCity} />
          <Option label="Provinsi" datas={dataProvince} />

          <View style={styles.inputPic}>
            <Text style={styles.label}>Foto Profil :</Text>

            <View style={styles.wrapUpload}>
              <Image source={profile.avatar} style={styles.pic} />

              <View style={styles.buttonPic}>
                <Button title="Change Picture" type="text" padding={8} />
              </View>
            </View>
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
        </ScrollView>
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
  },
  inputPic: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  pic: {
    width: responsiveWidth(120),
    height: responsiveHeight(134),
    borderRadius: 50,
  },
  wrapUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonPic: {
    marginLeft: 35,
    flex: 1,
  },
  submit: {
    marginVertical: 30,
  },
});
