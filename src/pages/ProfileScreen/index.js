import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  heightMobileUI,
  getData,
} from '../../utils';
import { menu } from '../../data';
import { ListMenu } from '../../components';
import { DefaultPic } from '../../assets';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      token: false,
      menus: menu,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {});
    this.getUserProfile();
    this.getUserToken();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserToken = () => {
    getData('token').then(res => {
      const token = res;

      if (token) {
        this.setState({
          token: token,
        });
      }
    });
  };

  getUserProfile = () => {
    getData('user').then(res => {
      const profile = res;

      if (profile) {
        this.setState({
          profile: profile,
        });
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  render() {
    const { profile, menus } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image source={DefaultPic} style={styles.pic} />
          <View style={styles.profile}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.desc}>Phone : {profile.phone}</Text>
            <Text style={styles.desc}>{profile.address}</Text>
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
    height: responsiveHeight(680),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  pic: {
    width: responsiveWidth(120),
    height: responsiveHeight(123),
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: -responsiveWidth(50),
  },
  profile: {
    marginTop: 30,
    marginBottom: 30,
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
