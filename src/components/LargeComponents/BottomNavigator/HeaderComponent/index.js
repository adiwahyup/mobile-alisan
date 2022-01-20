import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  colors,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utils';
import { Distance, Button } from '../../../SmallComponents';
import { connect } from 'react-redux';
import { getListCart } from '../../../../actions/CartAction';
import { logo } from '../../../../assets';

class HeaderComponent extends Component {
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        this.props.dispatch(getListCart(res.uid));
      }
    });
  }

  render() {
    const { navigation, getListCartResult } = this.props;

    let totalCart;
    if (getListCartResult) {
      totalCart = Object.keys(getListCartResult.cart).length;
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <View style={styles.wrapLogo}>
            <Image source={logo} style={styles.pic} />
          </View>
          <Distance width={10} />
          <View style={styles.button}>
            <Button
              icon="keranjang"
              padding={15}
              onPress={() => navigation.navigate('Cart')}
              totalCart={totalCart}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListCartResult: state.CartReducer.getListCartResult,
});

export default connect(mapStateToProps, null)(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(110),
  },

  textInput: {
    fontSize: 16,
    fontFamily: fonts.primary.reguler,
  },
  wrapperHeader: {
    flex: 1,
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapLogo: {
    flex: 1,
    alignItems: 'center',
    marginLeft: responsiveHeight(40),
  },
  pic: {
    marginBottom: 8,
    marginLeft: responsiveHeight(40),
    alignItems: 'center',
    width: responsiveWidth(130),
    height: responsiveHeight(155),
  },
  button: {
    marginBottom: 25,
  },
});
