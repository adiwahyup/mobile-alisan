import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  heightMobileUI,
} from '../utils/UtilsRouter';
import { dummyProfile, dummyMenu } from '../data/dummyRouter';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListMenu } from '../components/LargeComponents/LargeComponentRouter';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: dummyProfile,
      menus: dummyMenu,
    };
  }

  render() {
    const { profile, menus } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image source={profile.avatar} style={styles.pic} />
          <View style={styles.profile}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.desc}>Phone : {profile.phone}</Text>
            <Text style={styles.desc}>
              {profile.address} {profile.city}
            </Text>
          </View>
          <ListMenu menus={menus} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(592),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  pic: {
    width: responsiveWidth(120),
    height: responsiveHeight(123),
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -responsiveWidth(80),
  },
  profile: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(24, heightMobileUI),
    marginBottom: 5,
  },
  desc: {
    fontFamily: fonts.primary.reguler,
    fontSize: RFValue(18, heightMobileUI),
  },
});
