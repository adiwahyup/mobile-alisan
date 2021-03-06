import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  colors,
  fonts,
  responsiveWidth,
  numberFormat,
  responsiveHeight,
} from '../../../utils';
import Button from '../Button';

class CardProduct extends Component {
  mix = () => {
    const { product, product_dummy, navigation } = this.props;

    navigation.navigate('ProductDetail', {
      product,
      product_dummy,
    });
  };

  render() {
    const { product, product_dummy } = this.props;
    const discount = (product.product_price * product.product_discount) / 100;
    const final = product.product_price - discount;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
          <Image style={styles.gambar} source={product_dummy.image[0]} />
          <Text style={styles.text}>{product.product_name}</Text>
          <Text style={styles.price}>
            Rp {numberFormat(product.product_price)}
          </Text>
          <Text style={styles.newPrice}>Rp {numberFormat(final)}</Text>
        </TouchableOpacity>

        <Button
          type="text"
          title="Detail"
          padding={7}
          onPress={() => this.mix()}
        />
      </View>
    );
  }
}

export default connect()(CardProduct);

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: colors.lightCard,
    width: responsiveWidth(160),
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    marginBottom: 12,
  },
  gambar: {
    width: responsiveHeight(130),
    height: responsiveWidth(130),
  },
  text: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: colors.black,
  },
  price: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontFamily: fonts.primary.bold,
    fontSize: 12,
    textAlign: 'center',
    color: colors.red,
  },
  newPrice: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    textAlign: 'center',
  },
});
