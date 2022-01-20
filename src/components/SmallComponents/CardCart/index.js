import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { IconDelete } from '../../../assets';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  numberFormat,
  discount,
} from '../../../utils';
import Distance from '../Distance';

import { deleteCart } from '../../../actions/CartAction';
const CardCart = ({ cart, mainCart, id, product, dispatch }) => {
  const split = cart.product_picture.split(', ')[0];

  const img =
    split === 'id1-back.jpg'
      ? require('../../../assets/product/id1-back.jpg')
      : 'id2-back.jpg'
      ? require('../../../assets/product/id2-back.jpg')
      : null;

  const hapusCart = () => {
    dispatch(deleteCart(id, mainCart, cart));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={img} />
      <View style={styles.desc}>
        <Text style={styles.name}>{cart.product_name}</Text>
        <Text style={styles.text}>
          Rp {numberFormat(discount(cart.product_price, cart.product_discount))}
        </Text>
        <Distance height={responsiveHeight(14)} />

        <Text style={styles.textBold}>Quantity: {cart.qty}</Text>
        <Text style={styles.textBold}>Size: {cart.product_size}</Text>
        <Text style={styles.textBold}>
          Total Harga: Rp {numberFormat(cart.totalPrice)}
        </Text>
      </View>
      <TouchableOpacity style={styles.delete} onPress={() => hapusCart()}>
        <IconDelete />
      </TouchableOpacity>
    </View>
  );
};

export default connect()(CardCart);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  image: {
    width: responsiveWidth(88),
    height: responsiveHeight(135),
  },
  delete: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: fonts.primary.black,
    fontSize: 16,
    width: responsiveWidth(250),
    color: colors.black,
  },
  text: {
    fontFamily: fonts.primary.reguler,
    fontSize: 13,
    color: colors.black,
  },
  textBold: {
    fontFamily: fonts.primary.black,
    fontSize: 11,
    color: colors.black,
  },
});
