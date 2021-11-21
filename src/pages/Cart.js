import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListCart from '../components/LargeComponents/ListCart';
import { Button } from '../components/SmallComponents/SmallComponentRouter';
import { dummyOrder } from '../data/dummyRouter';
import {
  colors,
  numberWithCommas,
  responsiveHeight,
  fonts,
} from '../utils/UtilsRouter';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: dummyOrder[0],
    };
  }

  render() {
    const { order } = this.state;
    return (
      <View style={styles.page}>
        <ListCart carts={order.orders} />
        <View style={styles.footer}>
          {/* Total Harga */}
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(order.totalHarga)}
            </Text>
          </View>
          {/* Tombol */}
          <Button
            title="Checkout"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.props.navigation.navigate('Checkout')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,

    elevation: 11,
    paddingBottom: 30,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
